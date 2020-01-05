import SubCategory from '~/types/subcategory'

interface SplitCategory{
    main_id: number|null;
    main_name: string;
    subcategories: Array<SubCategory>;
    checkedBool: boolean;
}

export default SplitCategory