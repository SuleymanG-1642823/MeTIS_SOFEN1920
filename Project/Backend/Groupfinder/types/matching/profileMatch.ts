/**
 * This interface is used when finding project matches for a user.
 * Each instance (implementation) of this interface represents a
 * profile and its matching percentage with the user.
 */

interface ProfileMatch {
    profileID: number,
    profileName: String,
    matchingPercentile: number
}

export default ProfileMatch;