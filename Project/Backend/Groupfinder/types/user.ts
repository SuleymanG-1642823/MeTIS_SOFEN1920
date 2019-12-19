interface User {
    id: number|null;
    pw_hash?: string;
    is_admin?: boolean;
    first_name: string;
    last_name: string;
    mail: string;
    zip: string;
    city: string;
    tel: string;
    website: string;
    social_media: any;
}

export default User;