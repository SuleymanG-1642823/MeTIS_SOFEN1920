import UsersToProjectMatcher from '../UsersToProjectMatcher';
import SimpleDBInterface from './SimpleDBInterface';
const db_conn = require('../../databaseconnection');
import ProfileUserMatch from '../../types/matching/profileUserMatch';

export default class UsersToProjectMatcherTest{
    private static async initData(){
        let db = new SimpleDBInterface(db_conn);

        // users (id, firstName, lastName, mail)
        await db.insertNewUser(6010, 'testUser10', '10', 'testUser10@test.com');
        await db.insertNewUser(6011, 'testUser11', '11', 'testUser11@test.com');
        await db.insertNewUser(6012, 'testUser12', '12', 'testUser12@test.com');
        await db.insertNewUser(6013, 'testUser13', '13', 'testUser13@test.com');

        // projects (id, creator_id, name, status)
        await db.insertNewProject(7010, 6010, 'testProject10', 0); // testUser1 (6000)

        // profiles (id, name, project_id)
        await db.insertNewProfile(8010, 'Profile A', 7010); // testProject10 (7010)
        await db.insertNewProfile(8011, 'Profile B', 7010);
        await db.insertNewProfile(8012, 'Profile C', 7010);
        await db.insertNewProfile(8013, 'Profile D', 7010);
        await db.insertNewProfile(8014, 'Profile E', 7010);

        // profile skills (profile_id, skill_name, skill_experience, weight)
        await db.insertNewProfileSkill(8010, 'SKILL A1', 1, 1);  // Profile A
        await db.insertNewProfileSkill(8010, 'SKILL B1', 1, 1);
        await db.insertNewProfileSkill(8010, 'SKILL G1', 1, 1);
    
        await db.insertNewProfileSkill(8011, 'SKILL D1', 7, 1);  // Profile B
        await db.insertNewProfileSkill(8011, 'SKILL L1', 4, 1);
        await db.insertNewProfileSkill(8011, 'SKILL S1', 5, 1);
        
        await db.insertNewProfileSkill(8012, 'SKILL P1', 1, 8);  // Profile C
        await db.insertNewProfileSkill(8012, 'SKILL R1', 1, 1);
        await db.insertNewProfileSkill(8012, 'SKILL N1', 1, 3);
        
        await db.insertNewProfileSkill(8013, 'SKILL MICRO', 6, 5);  // Profile D
        await db.insertNewProfileSkill(8013, 'SKILL CENTI', 4, 5);
        await db.insertNewProfileSkill(8013, 'SKILL MILLI', 9, 1);

        await db.insertNewProfileSkill(8014, 'SKILL HECTO', 9, 5);  // Profile E
        await db.insertNewProfileSkill(8014, 'SKILL DECA', 7, 3);


        // user Skills
        await db.insertNewUserSkill(6011, 'SKILL A1', 1);    // testUser11
        await db.insertNewUserSkill(6011, 'SKILL B1', 1);     // Matching % with profile A: 100%
        await db.insertNewUserSkill(6011, 'SKILL G1', 1);

        await db.insertNewUserSkill(6011, 'SKILL D1', 4);   // Matching % with profile B: (4/7+1) / 3 = 53%
        await db.insertNewUserSkill(6011, 'SKILL L1', 7);    

        await db.insertNewUserSkill(6012, 'SKILL D1', 5);    // testUser12
        await db.insertNewUserSkill(6012, 'SKILL L1', 3);   // Matching % with profile B: (5/7 + 3/4 + 5/5) / 3 =  83%
        await db.insertNewUserSkill(6012, 'SKILL S1', 5);

        await db.insertNewUserSkill(6012, 'SKILL R1', 3);      // matching % with profile C: 4/12 = 34%
        await db.insertNewUserSkill(6012, 'SKILL N1', 5);

        await db.insertNewUserSkill(6013, 'SKILL D1', 5);    // testUser13
        await db.insertNewUserSkill(6013, 'SKILL S1', 4);    // matching % with profile B: (5/7 + 4/5) / 3 = 51%
        
        await db.insertNewUserSkill(6013, 'SKILL MICRO', 5);     // matching % with profile D: (5/6*5 + 2/4*5 + 5/9*1) / 11 = 66%
        await db.insertNewUserSkill(6013, 'SKILL CENTI', 2);
        await db.insertNewUserSkill(6013, 'SKILL MILLI', 5);

        
    }

    /**
     * retuns msg and msgToIndent concatenated by a newline and each line of msgToIndent is indented by a tab
     * @param msg: msg on first line
     * @param msgToIndent: msg beneath 'msg' that is indented by a tab
     */
    private static concatAndIndent(msg: string, msgToIndent: string): string{
        let result: string = msg + '\n'; // the message to be indented must start from the next line
        let lines: string[] = msgToIndent.split(/\r?\n/); // separate the string into strings delimitted by a newline character

        for (let line of lines){
            result += '    ' + line + '\n'; // indent the line, concat it with the result and end it with a newline
        }

        return result;
    }

    /**
     * Helper function, executes msgToIndentFunction() to get msgToIndent parameter
     * @param msg 
     * @param msgToIndentFunction 
     */
    private static async concatAndIndentHelperAsync(msg: string, msgToIndentFunction: () => Promise<string>): Promise<string>{
        return this.concatAndIndent(msg, await msgToIndentFunction());
    }

    /**
     * Returns a string for the testcase, 
     *      - if Object.is(value1, value2) is true: return 
     * @param value1 
     * @param value2 
     */
    private static equalsHelper(value1: any, value2: any, prefix: string = '', postfix: string = ''): string{
        if (Object.is(value1, value2)){
            return prefix + 'SUCCESS ' + postfix + '\n';
        }
        else{
            return prefix + 'FAILED ' + postfix + '\n';
        }
    }

    /**
     * Checks whether given list of matches is sorted
     * @param matches: array of profile-user matches
     * @pre the array userMatches in each ProfileUserMatch object must contain at least one element
     */
    private static isSorted(profileUserMatches: Array<ProfileUserMatch>): boolean{
        for (let i = 0; i < (profileUserMatches.length-1); i++){ // matches.length -1 because we need to ensure there is a next elem
            // profiles must be sorted in descending order according on their biggest matching percentage
            if (profileUserMatches[i].userMatches[0].matchingPercentage < profileUserMatches[i+1].userMatches[0].matchingPercentage){
                return false;
            }

            const currentUserMatches = profileUserMatches[i].userMatches;
            for (let j = 0; j < (currentUserMatches.length - 1); j++){
                // userMatches must be sorted in descending order according to their matching percentage
                if (currentUserMatches[j].matchingPercentage < currentUserMatches[j+1].matchingPercentage){
                    return false;
                }
            }
        }
        
        return true;
    }

   public static executeTests(): Promise<void>{
        return new Promise(async (resolve: any, reject: any) => {
            await this.initData();
            
            let results: string = await this.concatAndIndentHelperAsync('Testing class UsersToProjectMatcher', async () => {
                return await this.concatAndIndentHelperAsync('Testing function getMatchingUsers(projectID, dbconn)', async () => {
                    return await this.concatAndIndentHelperAsync('[1] Matching % calculation', async () => {                            
                        try{
                            // matchingResult: Array<ProjectMatch>
                            let matchingResult: Array<ProfileUserMatch> = await UsersToProjectMatcher.getMatchingUsers(7010, db_conn);
                            let resultingMsg: string = '';

                            // there must be results
                            if (matchingResult.length === 0){
                                resultingMsg = 'FAILED: no matches returned';
                            }
                            else if (matchingResult.length < 4){
                                resultingMsg = 'FAILED: incorrect amount of matches returned';
                            }
                            else{
                                // check sorting order
                                if (this.isSorted(matchingResult)){
                                    resultingMsg += '[1.0] SUCCESS matches are sorted\n';
                                }
                                else{
                                    resultingMsg += '[1.0] FAILED macthes are not sorted\n';
                                }

                                // check matching % with Profiles 
                                const profileA: ProfileUserMatch = matchingResult[0];
                                const profileB: ProfileUserMatch = matchingResult[1];
                                const profileD: ProfileUserMatch = matchingResult[2];
                                const profileC: ProfileUserMatch = matchingResult[3];

                                resultingMsg += this.equalsHelper(profileA.userMatches[0].matchingPercentage, 100, '[1.1] ');
                                resultingMsg += this.equalsHelper(profileB.userMatches[0].matchingPercentage, 83, '[1.2] ');
                                resultingMsg += this.equalsHelper(profileB.userMatches[1].matchingPercentage, 53, '[1.3] ');
                                resultingMsg += this.equalsHelper(profileB.userMatches[2].matchingPercentage, 51, '[1.4] ');
                                resultingMsg += this.equalsHelper(profileD.userMatches[0].matchingPercentage, 66, '[1.5] ');
                                resultingMsg += this.equalsHelper(profileC.userMatches[0].matchingPercentage, 34, '[1.6] ');

                                // If all tests pass that means all expected users came in the expected indexes which means the correct users are returned
                            }

                            return resultingMsg;
                        }catch(err){
                            return '!FAILED TO EXECUTE TESTS SUCCESSFULLY: ' + err.toString();
                        }
                    });
                });
            });
            
            console.log(results);
            resolve();
        });
    }
}