import SubCategory from '~/types/subcategory'

interface SplitCategory{
    main_id: number|null;
    main_name: string;
    subcategories: Array<SubCategory>
}

export default SplitCategory