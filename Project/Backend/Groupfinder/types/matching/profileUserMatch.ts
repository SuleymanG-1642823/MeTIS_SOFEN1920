import Profile from '../profile';
import UserMatch from './userMatch';

interface ProfileUserMatch{
    profile: Profile,
    userMatches: Array<UserMatch>
}

export default ProfileUserMatch;