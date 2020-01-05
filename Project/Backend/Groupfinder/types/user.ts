interface User {
    id?: number;
    password?: string;
    is_admin: boolean;
    first_name: string;
    last_name: string;
    mail: string;
    zip: string;
    city: string;
    tel: string;
    website: string;
    social_media: any;
    available: boolean;
    private: boolean;
}

export default User;