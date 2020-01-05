interface User {
    id: number | null;
    password?: string;
    is_admin: boolean;
    first_name: string;
    last_name: string;
    mail: string;
    address: string;
    zip: string;
    city: string;
    tel: string;
    website: string;
    social_media: any;
    available: boolean;
    private: boolean;
}

export default User;