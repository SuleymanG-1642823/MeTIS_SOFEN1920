interface User {
    id: number|null;
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
}

export default User;