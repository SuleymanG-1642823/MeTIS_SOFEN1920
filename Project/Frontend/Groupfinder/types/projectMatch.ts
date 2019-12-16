import Project from './project';
import ProfileMatch from './profileMatch';

interface ProjectMatch {
    project: Project,
    matches: Array<ProfileMatch>
}

export default ProjectMatch;