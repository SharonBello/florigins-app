import type { JSX } from "@emotion/react/jsx-runtime";
import type { Question } from "../types/Question";
import React from 'react';

export interface FlowerDefinition {
  country: string;
  countryHebrew: string;
  continent: string;
  continentHebrew: string;
  scientificName: string;
  scientificNameHebrew: string;
  gradientStops: string[];
}

export interface AppData {
  flowers: FlowerDefinition[];
  petalShapes: Record<string, string>;
  questions: Array<{
    id: string;
    label: string;
    type: string;
    options?: string[];
  }>;
}

export const flowerDefinitions: FlowerDefinition[] = [
  { country: 'Algeria', countryHebrew: 'אלג׳ריה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Iris (Iris tectorum)', scientificNameHebrew: 'Iris (Iris tectorum)', gradientStops: ['#5A4EAB', '#4C4291', '#3E3677', '#312A5E'] },
  { country: 'Angola', countryHebrew: 'אנגולה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Welwitschia (Welwitschia mirabilis)', scientificNameHebrew: 'Welwitschia (Welwitschia mirabilis)', gradientStops: ['#6F8F4E', '#5E7942', '#4D6436', '#3D4E2A'] },
  { country: 'Benin', countryHebrew: 'בנין', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Red Rose (Rosa sp.)', scientificNameHebrew: 'Red Rose (Rosa sp.)', gradientStops: ['#C21807', '#A41405', '#871004', '#6A0D03'] },
  { country: 'Botswana', countryHebrew: 'בוטסואנה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Swartland Sugarbush (Protea gaguedi)', scientificNameHebrew: 'Swartland Sugarbush (Protea gaguedi)', gradientStops: ['#D94E5A', '#B8424C', '#97363E', '#772A31'] },
  { country: 'Burkina Faso', countryHebrew: 'בורקינה פאסו', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Rose (Rosa sp.)', scientificNameHebrew: 'Rose (Rosa sp.)', gradientStops: ['#C21807', '#A41405', '#871004', '#6A0D03'] },
  { country: 'Burundi', countryHebrew: 'בורונדי', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Dracaena (Dracaena fragrans)', scientificNameHebrew: 'Dracaena (Dracaena fragrans)', gradientStops: ['#A4C23B', '#8BA432', '#728729', '#5A6A20'] },
  { country: 'Cabo Verde', countryHebrew: 'כף ורדה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Bougainvillea (Bougainvillea glabra)', scientificNameHebrew: 'Bougainvillea (Bougainvillea glabra)', gradientStops: ['#E43174', '#C12962', '#9F2251', '#7D1A3F'] },
  { country: 'Cameroon', countryHebrew: 'קמרון', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Red Stinkwood (Prunus africana)', scientificNameHebrew: 'Red Stinkwood (Prunus africana)', gradientStops: ['#C21807', '#A41405', '#871004', '#6A0D03'] },
  { country: 'Central African Republic', countryHebrew: 'הרפובליקה המרכז-אפריקאית', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Desert Rose (Adenium obesum)', scientificNameHebrew: 'Desert Rose (Adenium obesum)', gradientStops: ['#E64980', '#C33E6C', '#A13359', '#7E2846'] },
  { country: 'Chad', countryHebrew: 'צ\'אד', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Red Rose (Rosa sp.)', scientificNameHebrew: 'Red Rose (Rosa sp.)', gradientStops: ['#C21807', '#A41405', '#871004', '#6A0D03'] },
  { country: 'Comoros', countryHebrew: 'קומורו', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Ylang-Ylang (Cananga odorata)', scientificNameHebrew: 'Ylang-Ylang (Cananga odorata)', gradientStops: ['#FFE64E', '#D8C342', '#B2A136', '#8C7E2A'] },
  { country: 'Congo', countryHebrew: 'קונגו', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Silverbird (Strelitzia nicolai)', scientificNameHebrew: 'Silverbird (Strelitzia nicolai)', gradientStops: ['#F09000', '#CC7A00', '#A86400', '#844F00'] },
  { country: 'Democratic Republic of the Congo', countryHebrew: 'הרפובליקה הדמוקרטית של קונגו', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Flame Tree (Delonix regia)', scientificNameHebrew: 'Flame Tree (Delonix regia)', gradientStops: ['#D20A11', '#B2080E', '#93070B', '#730509'] },
  { country: 'Djibouti', countryHebrew: 'ג\'יבוטי', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Bougainvillea (Bougainvillea spectabilis)', scientificNameHebrew: 'Bougainvillea (Bougainvillea spectabilis)', gradientStops: ['#E43174', '#C12962', '#9F2251', '#7D1A3F'] },
  { country: 'Egypt', countryHebrew: 'מצרים', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Blue Lotus (Nymphaea caerulea)', scientificNameHebrew: 'Blue Lotus (Nymphaea caerulea)', gradientStops: ['#5DADEC', '#4F93C8', '#4179A5', '#F2DA44'] },
  { country: 'Equatorial Guinea', countryHebrew: 'גינאה המשוונית', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Red Hibiscus (Hibiscus rosa-sinensis)', scientificNameHebrew: 'Red Hibiscus (Hibiscus rosa-sinensis)', gradientStops: ['#D2042D', '#B20326', '#93021F', '#730218'] },
  { country: 'Eritrea', countryHebrew: 'אריתריאה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Gerbera Daisy (Gerbera jamesonii)', scientificNameHebrew: 'Gerbera Daisy (Gerbera jamesonii)', gradientStops: ['#FF6F61', '#D85E52', '#B24D43', '#8C3D35'] },
  { country: 'Eswatini', countryHebrew: 'אסוואטיני', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Red Hot Poker (Kniphofia uvaria)', scientificNameHebrew: 'Red Hot Poker (Kniphofia uvaria)', gradientStops: ['#FF4500', '#D83A00', '#B23000', '#8C2500'] },
  { country: 'Ethiopia', countryHebrew: 'אתיופיה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Calla Lily (Zantedeschia aethiopica)', scientificNameHebrew: 'Calla Lily (Zantedeschia aethiopica)', gradientStops: ['#7B886D', '#BDC3B6', '#FFFFFF', '#F7D876'] },
  { country: 'Gabon', countryHebrew: 'גאבון', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Okoume Flower (Aucoumea klaineana)', scientificNameHebrew: 'Okoume Flower (Aucoumea klaineana)', gradientStops: ['#F4C430', '#CFA628', '#AA8921', '#866B1A'] },
  { country: 'Gambia', countryHebrew: 'גמביה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'White Harebell (Campanula rotundifolia)', scientificNameHebrew: 'White Harebell (Campanula rotundifolia)', gradientStops: ['#D0F0FF', '#B0CCD8', '#91A8B2', '#72848C'] },
  { country: 'Ghana', countryHebrew: 'גאנה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Impala Lily (Adenium obesum)', scientificNameHebrew: 'Impala Lily (Adenium obesum)', gradientStops: ['#E64980', '#C33E6C', '#A13359', '#7E2846'] },
  { country: 'Guinea', countryHebrew: 'גינאה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'White Ginger Lily (Hedychium coronarium)', scientificNameHebrew: 'White Ginger Lily (Hedychium coronarium)', gradientStops: ['#FFF8F0', '#D8D2CC', '#B2ADA8', '#8C8884'] },
  { country: 'Guinea-Bissau', countryHebrew: 'גינאה-ביסאו', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'African Tulip (Spathodea campanulata)', scientificNameHebrew: 'African Tulip (Spathodea campanulata)', gradientStops: ['#FF4D00', '#D84100', '#B23500', '#8C2A00'] },
  { country: 'Ivory Coast', countryHebrew: 'חוף השנהב', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Baobab Flower (Adansonia digitata)', scientificNameHebrew: 'Baobab Flower (Adansonia digitata)', gradientStops: ['#FFE5B4', '#D8C299', '#B2A07D', '#8C7D63'] },
  { country: 'Kenya', countryHebrew: 'קניה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Orchid Tree (Bauhinia variegata)', scientificNameHebrew: 'Orchid Tree (Bauhinia variegata)', gradientStops: ['#C463BF', '#A654A2', '#894585', '#6B3669'] },
  { country: 'Lesotho', countryHebrew: 'לסוטו', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Spiral Aloin (Aloe polyphylla)', scientificNameHebrew: 'Spiral Aloin (Aloe polyphylla)', gradientStops: ['#FF7F50', '#D86B44', '#B25838', '#8C452C'] },
  { country: 'Liberia', countryHebrew: 'ליבריה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Pepper Flower (Capsicum annuum)', scientificNameHebrew: 'Pepper Flower (Capsicum annuum)', gradientStops: ['#FF0000', '#D80000', '#B20000', '#8C0000'] },
  { country: 'Libya', countryHebrew: 'לוב', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Pomegranate Flower (Punica granatum)', scientificNameHebrew: 'Pomegranate Flower (Punica granatum)', gradientStops: ['#DF0024', '#BD001E', '#7A0013', '#FFFFFF'] },
  { country: 'Madagascar', countryHebrew: 'מדגסקר', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Poinciana (Delonix regia)', scientificNameHebrew: 'Poinciana (Delonix regia)', gradientStops: ['#D20A11', '#B2080E', '#93070B', '#730509'] },
  { country: 'Malawi', countryHebrew: 'מלאווי', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Lotus (Nymphaea lotus)', scientificNameHebrew: 'Lotus (Nymphaea lotus)', gradientStops: ['#A0D6F9', '#88B5D3', '#7095AE', '#587588'] },
  { country: 'Mali', countryHebrew: 'מאלי', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Rose (Rosa sp.)', scientificNameHebrew: 'Rose (Rosa sp.)', gradientStops: ['#C21807', '#A41405', '#871004', '#6A0D03'] },
  { country: 'Mauritania', countryHebrew: 'מאוריטניה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Desert Rose (Adenium obesum)', scientificNameHebrew: 'Desert Rose (Adenium obesum)', gradientStops: ['#E64980', '#C33E6C', '#A13359', '#7E2846'] },
  { country: 'Mauritius', countryHebrew: 'מאוריציוס', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Boucle d\'Oreille (Ruizia boutoniana)', scientificNameHebrew: 'Boucle d\'Oreille (Ruizia boutoniana)', gradientStops: ['#FF3B38', '#D8322F', '#B22927', '#8C201E'] },
  { country: 'Morocco', countryHebrew: 'מרוקו', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Rose (Rosa damascena)', scientificNameHebrew: 'Rose (Rosa damascena)', gradientStops: ['#C60267', '#E50F85', '#F361B6', '#FD5FBB'] },
  { country: 'Mozambique', countryHebrew: 'מוזמביק', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Frangipani (Plumeria rubra)', scientificNameHebrew: 'Frangipani (Plumeria rubra)', gradientStops: ['#FFB7C5', '#D89BA7', '#B28089', '#8C646C'] },
  { country: 'Namibia', countryHebrew: 'נמיביה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Welwitschia (Welwitschia mirabilis)', scientificNameHebrew: 'Welwitschia (Welwitschia mirabilis)', gradientStops: ['#6F8F4E', '#5E7942', '#4D6436', '#3D4E2A'] },
  { country: 'Niger', countryHebrew: 'ניז\'ר', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Gerbera (Gerbera jamesonii)', scientificNameHebrew: 'Gerbera (Gerbera jamesonii)', gradientStops: ['#FF6F61', '#D85E52', '#B24D43', '#8C3D35'] },
  { country: 'Nigeria', countryHebrew: 'ניגריה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Yellow Trumpet (Costus spectabilis)', scientificNameHebrew: 'Yellow Trumpet (Costus spectabilis)', gradientStops: ['#F3C301', '#CEA500', '#AA8800', '#856B00'] },
  { country: 'Rwanda', countryHebrew: 'רואנדה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Protea (Protea cynaroides)', scientificNameHebrew: 'Protea (Protea cynaroides)', gradientStops: ['#D94E5A', '#B8424C', '#97363E', '#772A31'] },
  { country: 'Senegal', countryHebrew: 'סנגל', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Baobab Flower (Adansonia digitata)', scientificNameHebrew: 'Baobab Flower (Adansonia digitata)', gradientStops: ['#FFE5B4', '#D8C299', '#B2A07D', '#8C7D63'] },
  { country: 'Seychelles', countryHebrew: 'סיישל', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Tropicbird Orchid (Angraecum eburneum)', scientificNameHebrew: 'Tropicbird Orchid (Angraecum eburneum)', gradientStops: ['#FFFFFF', '#D8D8D8', '#B2B2B2', '#8C8C8C'] },
  { country: 'Sierra Leone', countryHebrew: 'סיירה לאון', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Gloriosa Lily (Gloriosa superba)', scientificNameHebrew: 'Gloriosa Lily (Gloriosa superba)', gradientStops: ['#E61936', '#C3152D', '#A11125', '#7E0D1D'] },
  { country: 'Somalia', countryHebrew: 'סומליה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Aloe Flower (Aloe vera)', scientificNameHebrew: 'Aloe Flower (Aloe vera)', gradientStops: ['#FF7F50', '#D86B44', '#B25838', '#8C452C'] },
  { country: 'South Africa', countryHebrew: 'דרום אפריקה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'King Protea (Protea cynaroides)', scientificNameHebrew: 'King Protea (Protea cynaroides)', gradientStops: ['#97363E', '#D94E5A', '#F7D876', '#6F833B'] },
  { country: 'South Sudan', countryHebrew: 'דרום סודן', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Hibiscus (Hibiscus rosa-sinensis)', scientificNameHebrew: 'Hibiscus (Hibiscus rosa-sinensis)', gradientStops: ['#D2042D', '#B20326', '#93021F', '#730218'] },
  { country: 'Sudan', countryHebrew: 'סודן', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Hibiscus (Hibiscus rosa-sinensis)', scientificNameHebrew: 'Hibiscus (Hibiscus rosa-sinensis)', gradientStops: ['#D2042D', '#B20326', '#93021F', '#730218'] },
  { country: 'São Tomé and Príncipe', countryHebrew: 'סאו טומה ופרינסיפה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Bird of Paradise (Strelitzia reginae)', scientificNameHebrew: 'Bird of Paradise (Strelitzia reginae)', gradientStops: ['#FF8C00', '#D87700', '#B26200', '#8C4D00'] },
  { country: 'Tanzania', countryHebrew: 'טנזניה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Clove (Syzygium aromaticum)', scientificNameHebrew: 'Clove (Syzygium aromaticum)', gradientStops: ['#8A0303', '#750202', '#600202', '#4B0101'] },
  { country: 'Togo', countryHebrew: 'טוגו', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'African Tulip (Spathodea campanulata)', scientificNameHebrew: 'African Tulip (Spathodea campanulata)', gradientStops: ['#FF4D00', '#D84100', '#B23500', '#8C2A00'] },
  { country: 'Tunisia', countryHebrew: 'תוניסיה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Jasmine (Jasminum officinale)', scientificNameHebrew: 'Jasmine (Jasminum officinale)', gradientStops: ['#B2B2B2', '#FFFFFF', '#FFFFFF', '#F7D876'] },
  { country: 'Uganda', countryHebrew: 'אוגנדה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Sunflower (Helianthus annuus)', scientificNameHebrew: 'Sunflower (Helianthus annuus)', gradientStops: ['#FFDA03', '#D8B902', '#B29802', '#8C7701'] },
  { country: 'Zambia', countryHebrew: 'זמביה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Bougainvillea (Bougainvillea spectabilis)', scientificNameHebrew: 'Bougainvillea (Bougainvillea spectabilis)', gradientStops: ['#E43174', '#C12962', '#9F2251', '#7D1A3F'] },
  { country: 'Zimbabwe', countryHebrew: 'זימבבואה', continent: 'Africa', continentHebrew: 'אפריקה', scientificName: 'Flame Lily (Gloriosa superba)', scientificNameHebrew: 'Flame Lily (Gloriosa superba)', gradientStops: ['#E61936', '#C3152D', '#A11125', '#7E0D1D'] },
  { country: 'Afghanistan', countryHebrew: 'אפגניסטן', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Tulip (Tulipa gesneriana)', scientificNameHebrew: 'Tulip (Tulipa gesneriana)', gradientStops: ['#FF7F50', '#D86B44', '#B25838', '#8C452C'] },
  { country: 'Armenia', countryHebrew: 'ארמניה', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Myosotis', scientificNameHebrew: 'Myosotis', gradientStops: ['#DDD1FF', '#B695FF', '#7B1EF8', '#6A04C4'] },
  { country: 'Azerbaijan', countryHebrew: 'אזרבייג\'ן', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Khari Bulbul (Ophrys caucasica)', scientificNameHebrew: 'Khari Bulbul (Ophrys caucasica)', gradientStops: ['#D282DC', '#B26EBB', '#935B9A', '#734779'] },
  { country: 'Bahrain', countryHebrew: 'בחריין', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'jasmine', scientificNameHebrew: 'jasmine', gradientStops: ['#B2B2B2', '#FFFFFF', '#FFFFFF', '#F7D876'] },
  { country: 'Bangladesh', countryHebrew: 'בנגלדש', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'White Water Lily (Nymphaea nouchali)', scientificNameHebrew: 'White Water Lily (Nymphaea nouchali)', gradientStops: ['#A0D6F9', '#88B5D3', '#7095AE', '#587588'] },
  { country: 'Bhutan', countryHebrew: 'בהוטן', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Blue Poppy (Meconopsis gakyidiana)', scientificNameHebrew: 'Blue Poppy (Meconopsis gakyidiana)', gradientStops: ['#4F9CF7', '#4384D1', '#376DAC', '#2B5587'] },
  { country: 'Brunei', countryHebrew: 'ברוניי', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Simpoh Ayer (Dillenia suffruticosa)', scientificNameHebrew: 'Simpoh Ayer (Dillenia suffruticosa)', gradientStops: ['#F7D358', '#D1B34A', '#AC933D', '#877430'] },
  { country: 'Cambodia', countryHebrew: 'קמבודיה', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Romduol (Sphaerocoryne affinis)', scientificNameHebrew: 'Romduol (Sphaerocoryne affinis)', gradientStops: ['#FFF2B2', '#D8CD97', '#B2A97C', '#8C8561'] },
  { country: 'China', countryHebrew: 'סין', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Peony (Paeonia suffruticosa)', scientificNameHebrew: 'Peony (Paeonia suffruticosa)', gradientStops: ['#DB7093', '#BA5F7C', '#994E66', '#783D50'] },
  { country: 'Cyprus', countryHebrew: 'קפריסין', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Cyclamen (Cyclamen cyprium)', scientificNameHebrew: 'Cyclamen (Cyclamen cyprium)', gradientStops: ['#FFB7C5', '#D89BA7', '#B28089', '#8C646C'] },
  { country: 'Georgia', countryHebrew: 'גאורגיה', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Cherokee Rose', scientificNameHebrew: 'Cherokee Rose', gradientStops: ['#D3E7CF', '#FFFFFF', '#FFFFFF', '#F7D876'] },
  { country: 'India', countryHebrew: 'הודו', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Sacred Lotus (Nelumbo nucifera)', scientificNameHebrew: 'Sacred Lotus (Nelumbo nucifera)', gradientStops: ['#BFC602', '#E50F85', '#F361B6', '#FD5FBB'] },
  { country: 'Indonesia', countryHebrew: 'אינדונזיה', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Jasmine (Jasminum sambac)', scientificNameHebrew: 'Jasmine (Jasminum sambac)', gradientStops: ['#FFFFFF', '#D8D8D8', '#B2B2B2', '#8C8C8C'] },
  { country: 'Iran', countryHebrew: 'איראן', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Water Lily (Nymphaea lotus)', scientificNameHebrew: 'Water Lily (Nymphaea lotus)', gradientStops: ['#BFC602', '#E50F85', '#F361B6', '#FD5FBB'] },
  { country: 'Iraq', countryHebrew: 'עיראק', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Red Rose (Rosa damascena)', scientificNameHebrew: 'Red Rose (Rosa damascena)', gradientStops: ['#C21807', '#A41405', '#871004', '#6A0D03'] },
  { country: 'Israel', countryHebrew: 'ישראל', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Poppy Anemone (Anemone coronaria)', scientificNameHebrew: 'Poppy Anemone (Anemone coronaria)', gradientStops: ['#E61936', '#C3152D', '#7E0D1D', '#190004'] },
  { country: 'Japan', countryHebrew: 'יפן', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Chrysanthemum (Chrysanthemum morifolium)', scientificNameHebrew: 'Chrysanthemum (Chrysanthemum morifolium)', gradientStops: ['#FFC5EA', '#FFDA03', '#B29802', '#8C7701'] },
  { country: 'Jordan', countryHebrew: 'ירדן', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Black Iris (Iris nigricans)', scientificNameHebrew: 'Black Iris (Iris nigricans)', gradientStops: ['#3B3B3B', '#323232', '#292929', '#5D0303'] },
  { country: 'Kazakhstan', countryHebrew: 'קזחסטן', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Lily', scientificNameHebrew: 'Lily', gradientStops: ['#FFFFFF', '#FFFAEA', '#F7D876', '#CF0502'] },
  { country: 'Kuwait', countryHebrew: 'כווית', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Arfaj (Rhanterium epapposum)', scientificNameHebrew: 'Arfaj (Rhanterium epapposum)', gradientStops: ['#FFD966', '#D8B856', '#B29747', '#8C7738'] },
  { country: 'Kyrgyzstan', countryHebrew: 'קירגיזסטן', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Tulip (Tulipa)', scientificNameHebrew: 'Tulip (Tulipa)', gradientStops: ['#FF7F50', '#D86B44', '#B25838', '#8C452C'] },
  { country: 'Laos', countryHebrew: 'לאוס', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Plumeria (Plumeria rubra)', scientificNameHebrew: 'Plumeria (Plumeria rubra)', gradientStops: ['#FFB7C5', '#D89BA7', '#B28089', '#8C646C'] },
  { country: 'Lebanon', countryHebrew: 'לבנון', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Cedar Blossom (Cedrus libani)', scientificNameHebrew: 'Cedar Blossom (Cedrus libani)', gradientStops: ['#BD3695', '#EEE9E5', '#EAD3E7', '#B183A8'] },
  { country: 'Malaysia', countryHebrew: 'מלזיה', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Chinese Hibiscus (Hibiscus rosa-sinensis)', scientificNameHebrew: 'Chinese Hibiscus (Hibiscus rosa-sinensis)', gradientStops: ['#D2042D', '#B20326', '#93021F', '#730218'] },
  { country: 'Maldives', countryHebrew: 'המלדיביים', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Pink Rose (Rosa polyantha)', scientificNameHebrew: 'Pink Rose (Rosa polyantha)', gradientStops: ['#FFC0CB', '#D8A3AC', '#B2868E', '#8C696F'] },
  { country: 'Mongolia', countryHebrew: 'מונגוליה', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Alpine Scabious (Scabiosa comosa)', scientificNameHebrew: 'Alpine Scabious (Scabiosa comosa)', gradientStops: ['#C5B4E3', '#A799C0', '#897D9E', '#6C637C'] },
  { country: 'Myanmar', countryHebrew: 'מיאנמר', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Paduak (Pterocarpus indicus)', scientificNameHebrew: 'Paduak (Pterocarpus indicus)', gradientStops: ['#E3B505', '#C09904', '#9E7E03', '#7C6302'] },
  { country: 'Nepal', countryHebrew: 'נפאל', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Tree Rhododendron (Rhododendron arboreum)', scientificNameHebrew: 'Tree Rhododendron (Rhododendron arboreum)', gradientStops: ['#D70040', '#B60036', '#96002C', '#760023'] },
  { country: 'North Korea', countryHebrew: 'צפון קוריאה', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Magnolia (Magnolia sieboldii)', scientificNameHebrew: 'Magnolia (Magnolia sieboldii)', gradientStops: ['#FFFFFF', '#D8D8D8', '#B2B2B2', '#8C8C8C'] },
  { country: 'Oman', countryHebrew: 'עומאן', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Jasmine', scientificNameHebrew: 'Jasmine', gradientStops: ['#E4154A', '#F6699B', '#FFC5DE', '#F2DA44'] },
  { country: 'Pakistan', countryHebrew: 'פקיסטן', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Common Jasmine (Jasminum officinale)', scientificNameHebrew: 'Common Jasmine (Jasminum officinale)', gradientStops: ['#FFFFFF', '#D8D8D8', '#B2B2B2', '#8C8C8C'] },
  { country: 'Philippines', countryHebrew: 'הפיליפינים', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Sampaguita (Jasminum sambac)', scientificNameHebrew: 'Sampaguita (Jasminum sambac)', gradientStops: ['#FFECB0', '#FFF5D7', '#FFFFFF', '#D6D4D4'] },
  { country: 'Qatar', countryHebrew: 'קטר', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Qatar Purple Orchid (Cattleya)', scientificNameHebrew: 'Qatar Purple Orchid (Cattleya)', gradientStops: ['#9932CC', '#822AAD', '#6B238E', '#541B70'] },
  { country: 'Saudi Arabia', countryHebrew: 'ערב הסעודית', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Taif Rose (Rosa × damascena)', scientificNameHebrew: 'Taif Rose (Rosa × damascena)', gradientStops: ['#E0115F', '#BE0E50', '#9C0B42', '#7B0934'] },
  { country: 'Singapore', countryHebrew: 'סינגפור', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Vanda Miss Joaquim (Papilionanthe Miss Joaquim)', scientificNameHebrew: 'Vanda Miss Joaquim (Papilionanthe Miss Joaquim)', gradientStops: ['#DA70D6', '#B95FB5', '#984E95', '#773D75'] },
  { country: 'South Korea', countryHebrew: 'דרום קוריאה', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Rose of Sharon (Hibiscus syriacus)', scientificNameHebrew: 'Rose of Sharon (Hibiscus syriacus)', gradientStops: ['#E0DDB4', '#E3B8EE', '#CA042B', '#93021F'] },
  { country: 'Sri Lanka', countryHebrew: 'סרי לנקה', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Blue Water Lily (Nymphaea stellata)', scientificNameHebrew: 'Blue Water Lily (Nymphaea stellata)', gradientStops: ['#5DADEC', '#4F93C8', '#4179A5', '#335F81'] },
  { country: 'Syria', countryHebrew: 'סוריה', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Jasmine (Jasminum officinale)', scientificNameHebrew: 'Jasmine (Jasminum officinale)', gradientStops: ['#B2D4AB', '#D3E7CF', '#FFFFFF', '#FFFFFF'] },
  { country: 'Taiwan', countryHebrew: 'טאיוואן', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Plum Blossom (Prunus mume)', scientificNameHebrew: 'Plum Blossom (Prunus mume)', gradientStops: ['#FFCDD2', '#D8AEB2', '#B28F93', '#8C7073'] },
  { country: 'Tajikistan', countryHebrew: 'טג\'יקיסטן', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Tulip (Tulipa)', scientificNameHebrew: 'Tulip (Tulipa)', gradientStops: ['#FF7F50', '#D86B44', '#B25838', '#8C452C'] },
  { country: 'Thailand', countryHebrew: 'תאילנד', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Golden Shower Tree (Cassia fistula)', scientificNameHebrew: 'Golden Shower Tree (Cassia fistula)', gradientStops: ['#FFD700', '#D8B600', '#B29600', '#8C7600'] },
  { country: 'Turkey', countryHebrew: 'טורקיה', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Tulip (Tulipa gesneriana)', scientificNameHebrew: 'Tulip (Tulipa gesneriana)', gradientStops: ['#FF7F50', '#D86B44', '#B25838', '#8C452C'] },
  { country: 'Turkmenistan', countryHebrew: 'טורקמניסטן', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Red Rose (Rosa rugosa)', scientificNameHebrew: 'Red Rose (Rosa rugosa)', gradientStops: ['#C21807', '#A41405', '#871004', '#6A0D03'] },
  { country: 'United Arab Emirates', countryHebrew: 'איחוד האמירויות הערביות', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Tribulus (Tribulus omanense)', scientificNameHebrew: 'Tribulus (Tribulus omanense)', gradientStops: ['#F4C237', '#CFA42E', '#AA8726', '#866A1E'] },
  { country: 'Uzbekistan', countryHebrew: 'אוזבקיסטן', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Cotton Flower (Gossypium)', scientificNameHebrew: 'Cotton Flower (Gossypium)', gradientStops: ['#FFFFFF', '#D8D8D8', '#B2B2B2', '#8C8C8C'] },
  { country: 'Vietnam', countryHebrew: 'וייטנאם', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Lotus (Nelumbo nucifera)', scientificNameHebrew: 'Lotus (Nelumbo nucifera)', gradientStops: ['#FFB7C5', '#D89BA7', '#B28089', '#8C646C'] },
  { country: 'Yemen', countryHebrew: 'תימן', continent: 'Asia', continentHebrew: 'אסיה', scientificName: 'Coffee arabica flower', scientificNameHebrew: 'Coffee arabica flower', gradientStops: ['#FFFAEA', '#FFFFFF', '#D6D4D4', '#16380F'] },
  { country: 'Albania', countryHebrew: 'אלבניה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Red Poppy (Papaver rhoeas)', scientificNameHebrew: 'Red Poppy (Papaver rhoeas)', gradientStops: ['#E61936', '#C3152D', '#A11125', '#7E0D1D'] },
  { country: 'Andorra', countryHebrew: 'אנדורה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Poet\'s Narcissus (Narcissus poeticus)', scientificNameHebrew: 'Poet\'s Narcissus (Narcissus poeticus)', gradientStops: ['#FFFFF0', '#D8D8CC', '#B2B2A8', '#8C8C84'] },
  { country: 'Austria', countryHebrew: 'אוסטריה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Edelweiss (Leontopodium nivale)', scientificNameHebrew: 'Edelweiss (Leontopodium nivale)', gradientStops: ['#E0C778', '#F7E8BA', '#F8F8FF', '#88888C'] },
  { country: 'Belarus', countryHebrew: 'בלארוס', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Flax Flower (Linum usitatissimum)', scientificNameHebrew: 'Flax Flower (Linum usitatissimum)', gradientStops: ['#F7D876', '#77B5FE', '#537EB1', '#41638B'] },
  { country: 'Belgium', countryHebrew: 'בלגיה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Red Poppy (Papaver rhoeas)', scientificNameHebrew: 'Red Poppy (Papaver rhoeas)', gradientStops: ['#E61936', '#C3152D', '#A11125', '#7E0D1D'] },
  { country: 'Bosnia and Herzegovina', countryHebrew: 'בוסניה והרצגובינה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Golden Lily (Lilium bosniacum)', scientificNameHebrew: 'Golden Lily (Lilium bosniacum)', gradientStops: ['#FFD700', '#D8B600', '#B29600', '#8C7600'] },
  { country: 'Bulgaria', countryHebrew: 'בולגריה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Rose (Rosa damascena)', scientificNameHebrew: 'Rose (Rosa damascena)', gradientStops: ['#C60267', '#E50F85', '#F361B6', '#FD5FBB'] },
  { country: 'Croatia', countryHebrew: 'קרואטיה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Iris (Iris croatica)', scientificNameHebrew: 'Iris (Iris croatica)', gradientStops: ['#5A4EAB', '#4C4291', '#3E3677', '#312A5E'] },
  { country: 'Czech Republic', countryHebrew: 'הרפובליקה הצ\'כית', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Lime Tree Blossom (Tilia cordata)', scientificNameHebrew: 'Lime Tree Blossom (Tilia cordata)', gradientStops: ['#C21807', '#A41405', '#871004', '#6A0D03'] },
  { country: 'Denmark', countryHebrew: 'דנמרק', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Marguerite Daisy (Argyranthemum frutescens)', scientificNameHebrew: 'Marguerite Daisy (Argyranthemum frutescens)', gradientStops: ['#F7D876', '#FBEBB3', '#FFFFF0', '#B2B2A8'] },
  { country: 'Estonia', countryHebrew: 'אסטוניה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Cornflower (Centaurea cyanus)', scientificNameHebrew: 'Cornflower (Centaurea cyanus)', gradientStops: ['#2E2EFE', '#2727D7', '#2020B1', '#19198B'] },
  { country: 'Finland', countryHebrew: 'פינלנד', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Lily of the Valley (Convallaria majalis)', scientificNameHebrew: 'Lily of the Valley (Convallaria majalis)', gradientStops: ['#FFFFFF', '#D8D8D8', '#B2B2B2', '#8C8C8C'] },
  { country: 'France', countryHebrew: 'צרפת', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Iris (Iris pseudacorus)', scientificNameHebrew: 'Iris (Iris pseudacorus)', gradientStops: ['#F7D876', '#5A4EAB', '#3E3677', '#312A5E'] },
  { country: 'Germany', countryHebrew: 'גרמניה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Cornflower (Centaurea cyanus)', scientificNameHebrew: 'Cornflower (Centaurea cyanus)', gradientStops: ['#2E2EFE', '#2727D7', '#2020B1', '#19198B'] },
  { country: 'Greece', countryHebrew: 'יוון', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Bear\'s Breeches (Acanthus mollis)', scientificNameHebrew: 'Bear\'s Breeches (Acanthus mollis)', gradientStops: ['#F3EFEC', '#8F7668', '#BD68A5', '#E04299'] },
  { country: 'Hungary', countryHebrew: 'הונגריה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Tulip (Tulipa)', scientificNameHebrew: 'Tulip (Tulipa)', gradientStops: ['#FF5050', '#D84444', '#B23838', '#8C2C2C'] },
  { country: 'Iceland', countryHebrew: 'איסלנד', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Mountain Avens (Dryas octopetala)', scientificNameHebrew: 'Mountain Avens (Dryas octopetala)', gradientStops: ['#FFFFF0', '#D8D8CC', '#B2B2A8', '#8C8C84'] },
  { country: 'Ireland', countryHebrew: 'אירלנד', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Shamrock (Trifolium dubium)', scientificNameHebrew: 'Shamrock (Trifolium dubium)', gradientStops: ['#00A86B', '#008E5A', '#00754A', '#005C3A'] },
  { country: 'Italy', countryHebrew: 'איטליה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Strawberry Tree Flower (Arbutus unedo)', scientificNameHebrew: 'Strawberry Tree Flower (Arbutus unedo)', gradientStops: ['#DEF1C4', '#F7B7A3', '#AC8072', '#876459'] },
  { country: 'Latvia', countryHebrew: 'לטביה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Oxeye Daisy (Leucanthemum vulgare)', scientificNameHebrew: 'Oxeye Daisy (Leucanthemum vulgare)', gradientStops: ['#F7D876', '#FDF5D1', '#FFFFF0', '#B2B2A8'] },
  { country: 'Liechtenstein', countryHebrew: 'ליכטנשטיין', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Blue Gentian (Gentiana acaulis)', scientificNameHebrew: 'Blue Gentian (Gentiana acaulis)', gradientStops: ['#2E2EFE', '#2727D7', '#2020B1', '#19198B'] },
  { country: 'Lithuania', countryHebrew: 'ליטא', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Rue (Ruta graveolens)', scientificNameHebrew: 'Rue (Ruta graveolens)', gradientStops: ['#BD980F', '#CBB40D', '#E0CD0B', '#F4E50F'] },
  { country: 'Luxembourg', countryHebrew: 'לוקסמבורג', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Rose (Rosa sp.)', scientificNameHebrew: 'Rose (Rosa sp.)', gradientStops: ['#E0115F', '#BE0E50', '#9C0B42', '#7B0934'] },
  { country: 'Malta', countryHebrew: 'מלטה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Maltese Centaury (Cheirolophus crassifolius)', scientificNameHebrew: 'Maltese Centaury (Cheirolophus crassifolius)', gradientStops: ['#FF69B4', '#D85999', '#B2497D', '#8C3963'] },
  { country: 'Moldova', countryHebrew: 'מולדובה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Basil Flower (Ocimum basilicum)', scientificNameHebrew: 'Basil Flower (Ocimum basilicum)', gradientStops: ['#8FBC8F', '#799F79', '#648364', '#4E674E'] },
  { country: 'Monaco', countryHebrew: 'מונקו', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Carnation (Dianthus caryophyllus)', scientificNameHebrew: 'Carnation (Dianthus caryophyllus)', gradientStops: ['#FF007F', '#D8006B', '#B20058', '#8C0045'] },
  { country: 'Montenegro', countryHebrew: 'מונטנגרו', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Oak Leaf Hydrangea (Hydrangea quercifolia)', scientificNameHebrew: 'Oak Leaf Hydrangea (Hydrangea quercifolia)', gradientStops: ['#F5F5F5', '#D0D0D0', '#ABABAB', '#868686'] },
  { country: 'Netherlands', countryHebrew: 'הולנד', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Daisy (Bellis perennis)', scientificNameHebrew: 'Daisy (Bellis perennis)', gradientStops: ['#F7D876', '#FBEBB3', '#FFFFF0', '#B2B2A8'] },
  { country: 'North Macedonia', countryHebrew: 'צפון מקדוניה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Red Poppy (Papaver rhoeas)', scientificNameHebrew: 'Red Poppy (Papaver rhoeas)', gradientStops: ['#E61936', '#C3152D', '#A11125', '#7E0D1D'] },
  { country: 'Norway', countryHebrew: 'נורווגיה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Heather (Calluna vulgaris)', scientificNameHebrew: 'Heather (Calluna vulgaris)', gradientStops: ['#D8BFD8', '#B7A2B7', '#978597', '#766976'] },
  { country: 'Poland', countryHebrew: 'פולין', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Red Poppy (Papaver rhoeas)', scientificNameHebrew: 'Red Poppy (Papaver rhoeas)', gradientStops: ['#E61936', '#C3152D', '#7E0D1D', '#190004'] },
  { country: 'Portugal', countryHebrew: 'פורטוגל', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Lavender (Lavandula stoechas)', scientificNameHebrew: 'Lavender (Lavandula stoechas)', gradientStops: ['#B57EDC', '#996BBB', '#7E589A', '#634579'] },
  { country: 'Romania', countryHebrew: 'רומניה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Peony (Paeonia officinalis)', scientificNameHebrew: 'Peony (Paeonia officinalis)', gradientStops: ['#F7D876', '#DB7093', '#994E66', '#783D50'] },
  { country: 'Russia', countryHebrew: 'רוסיה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Chamomile (Matricaria chamomilla)', scientificNameHebrew: 'Chamomile (Matricaria chamomilla)', gradientStops: ['#F7D876', '#FDF5D1', '#FFFFF0', '#B2B2A8'] },
  { country: 'San Marino', countryHebrew: 'סן מרינו', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Cyclamen (Cyclamen repandum)', scientificNameHebrew: 'Cyclamen (Cyclamen repandum)', gradientStops: ['#FFB7C5', '#D89BA7', '#B28089', '#8C646C'] },
  { country: 'Serbia', countryHebrew: 'סרביה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Natalie\'s Ramonda (Ramonda nathaliae)', scientificNameHebrew: 'Natalie\'s Ramonda (Ramonda nathaliae)', gradientStops: ['#A19CD8', '#8884B7', '#706D97', '#585576'] },
  { country: 'Slovakia', countryHebrew: 'סלובקיה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Lime Tree Blossom (Tilia cordata)', scientificNameHebrew: 'Lime Tree Blossom (Tilia cordata)', gradientStops: ['#FFFACD', '#D8D4AE', '#B2AF8F', '#8C8970'] },
  { country: 'Slovenia', countryHebrew: 'סלובניה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Carnation (Dianthus caryophyllus)', scientificNameHebrew: 'Carnation (Dianthus caryophyllus)', gradientStops: ['#FF007F', '#D8006B', '#B20058', '#8C0045'] },
  { country: 'Spain', countryHebrew: 'ספרד', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Red Carnation (Dianthus caryophyllus)', scientificNameHebrew: 'Red Carnation (Dianthus caryophyllus)', gradientStops: ['#FFF9CF', '#C21807', '#A41405', '#6A0D03'] },
  { country: 'Sweden', countryHebrew: 'שוודיה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Harebell (Campanula rotundifolia)', scientificNameHebrew: 'Harebell (Campanula rotundifolia)', gradientStops: ['#7EC0EE', '#6BA3CA', '#5886A6', '#456982'] },
  { country: 'Switzerland', countryHebrew: 'שווייץ', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Edelweiss (Leontopodium nivale)', scientificNameHebrew: 'Edelweiss (Leontopodium nivale)', gradientStops: ['#E0C778', '#F7E8BA', '#F8F8FF', '#ADADB2'] },
  { country: 'Ukraine', countryHebrew: 'אוקראינה', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Sunflower (Helianthus annuus)', scientificNameHebrew: 'Sunflower (Helianthus annuus)', gradientStops: ['#FFDA03', '#D8B902', '#B29802', '#8C7701'] },
  { country: 'United Kingdom', countryHebrew: 'הממלכה המאוחדת', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Tudor Rose (Rosa × alba)', scientificNameHebrew: 'Tudor Rose (Rosa × alba)', gradientStops: ['#F7D876', '#DD783F', '#C21807', '#6A0D03'] },
  { country: 'Vatican City', countryHebrew: 'הוותיקן', continent: 'Europe', continentHebrew: 'אירופה', scientificName: 'Easter Lily (Lilium longiflorum)', scientificNameHebrew: 'Easter Lily (Lilium longiflorum)', gradientStops: ['#FFFFF0', '#D8D8CC', '#B2B2A8', '#8C8C84'] },
  { country: 'Antigua and Barbuda', countryHebrew: 'אנטיגואה וברבודה', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Red Hibiscus (Hibiscus rosa-sinensis)', scientificNameHebrew: 'Red Hibiscus (Hibiscus rosa-sinensis)', gradientStops: ['#D2042D', '#B20326', '#93021F', '#730218'] },
  { country: 'Bahamas', countryHebrew: 'בהאמה', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Yellow Elder (Tecoma stans)', scientificNameHebrew: 'Yellow Elder (Tecoma stans)', gradientStops: ['#FFD800', '#D8B700', '#B29700', '#8C7600'] },
  { country: 'Barbados', countryHebrew: 'ברבדוס', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Pride of Barbados (Caesalpinia pulcherrima)', scientificNameHebrew: 'Pride of Barbados (Caesalpinia pulcherrima)', gradientStops: ['#FF2400', '#D81E00', '#B21900', '#8C1300'] },
  { country: 'Belize', countryHebrew: 'בליז', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Black Orchid (Prosthechea cochleata)', scientificNameHebrew: 'Black Orchid (Prosthechea cochleata)', gradientStops: ['#6A5ACD', '#5A4CAE', '#4A3E8F', '#3A3170'] },
  { country: 'Canada', countryHebrew: 'קנדה', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Maple Leaf (Acer saccharum)', scientificNameHebrew: 'Maple Leaf (Acer saccharum)', gradientStops: ['#FFFFFF', '#F5F8F5', '#92B83A', '#F31120'] },
  { country: 'Costa Rica', countryHebrew: 'קוסטה ריקה', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Guaria Morada (Guarianthe skinneri)', scientificNameHebrew: 'Guaria Morada (Guarianthe skinneri)', gradientStops: ['#DA70D6', '#B95FB5', '#984E95', '#773D75'] },
  { country: 'Cuba', countryHebrew: 'קובה', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'White Ginger (Hedychium coronarium)', scientificNameHebrew: 'White Ginger (Hedychium coronarium)', gradientStops: ['#FFFFFF', '#D8D8D8', '#B2B2B2', '#8C8C8C'] },
  { country: 'Dominica', countryHebrew: 'דומיניקה', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Caribwood Flower (Sabinea carinalis)', scientificNameHebrew: 'Caribwood Flower (Sabinea carinalis)', gradientStops: ['#DC143C', '#BB1133', '#9A0E2A', '#790B21'] },
  { country: 'Dominican Republic', countryHebrew: 'הרפובליקה הדומיניקנית', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Bayahibe Rose (Pereskia quisqueyana)', scientificNameHebrew: 'Bayahibe Rose (Pereskia quisqueyana)', gradientStops: ['#C60267', '#E50F85', '#F361B6', '#FD5FBB'] },
  { country: 'El Salvador', countryHebrew: 'אל סלוודור', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Izote Flower (Yucca gigantea)', scientificNameHebrew: 'Izote Flower (Yucca gigantea)', gradientStops: ['#FFFFFF', '#D8D8D8', '#B2B2B2', '#8C8C8C'] },
  { country: 'Grenada', countryHebrew: 'גרנדה', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Bougainvillea (Bougainvillea glabra)', scientificNameHebrew: 'Bougainvillea (Bougainvillea glabra)', gradientStops: ['#E43174', '#C12962', '#9F2251', '#7D1A3F'] },
  { country: 'Guatemala', countryHebrew: 'גואטמלה', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'White Nun Orchid (Lycaste skinneri alba)', scientificNameHebrew: 'White Nun Orchid (Lycaste skinneri alba)', gradientStops: ['#FFFFFF', '#D8D8D8', '#B2B2B2', '#8C8C8C'] },
  { country: 'Haiti', countryHebrew: 'האיטי', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Hibiscus (Hibiscus rosa-sinensis)', scientificNameHebrew: 'Hibiscus (Hibiscus rosa-sinensis)', gradientStops: ['#D2042D', '#B20326', '#93021F', '#730218'] },
  { country: 'Honduras', countryHebrew: 'הונדורס', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Orchid Rhyncholaelia digbyana (Rhyncholaelia digbyana)', scientificNameHebrew: 'Orchid Rhyncholaelia digbyana (Rhyncholaelia digbyana)', gradientStops: ['#E6E6FA', '#C3C3D4', '#A1A1AF', '#7E7E89'] },
  { country: 'Jamaica', countryHebrew: 'ג\'מייקה', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Lignum Vitae (Guaiacum officinale)', scientificNameHebrew: 'Lignum Vitae (Guaiacum officinale)', gradientStops: ['#66CDAA', '#56AE90', '#478F76', '#38705D'] },
  { country: 'Mexico', countryHebrew: 'מקסיקו', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Dahlia (Dahlia pinnata)', scientificNameHebrew: 'Dahlia (Dahlia pinnata)', gradientStops: ['#FF69B4', '#D85999', '#B2497D', '#8C3963'] },
  { country: 'Nicaragua', countryHebrew: 'ניקרגואה', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Sacuanjoche (Plumeria rubra)', scientificNameHebrew: 'Sacuanjoche (Plumeria rubra)', gradientStops: ['#FFB7C5', '#D89BA7', '#B28089', '#8C646C'] },
  { country: 'Panama', countryHebrew: 'פנמה', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Holy Ghost Orchid (Peristeria elata)', scientificNameHebrew: 'Holy Ghost Orchid (Peristeria elata)', gradientStops: ['#FFFFFF', '#D8D8D8', '#B2B2B2', '#8C8C8C'] },
  { country: 'Saint Kitts and Nevis', countryHebrew: 'סנט קיטס ונוויס', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Poinciana (Delonix regia)', scientificNameHebrew: 'Poinciana (Delonix regia)', gradientStops: ['#D20A11', '#B2080E', '#93070B', '#730509'] },
  { country: 'Saint Lucia', countryHebrew: 'סנט לוסיה', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Rose and the Marguerite (Rosa sp. & Chrysanthemum frutescens)', scientificNameHebrew: 'Rose and the Marguerite (Rosa sp. & Chrysanthemum frutescens)', gradientStops: ['#FF69B4', '#D85999', '#B2497D', '#8C3963'] },
  { country: 'Saint Vincent and the Grenadines', countryHebrew: 'סנט וינסנט והגרנדינים', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Soufriere Tree (Spacheidos nelsonii)', scientificNameHebrew: 'Soufriere Tree (Spacheidos nelsonii)', gradientStops: ['#8FBC8F', '#799F79', '#648364', '#4E674E'] },
  { country: 'Trinidad and Tobago', countryHebrew: 'טרינידד וטובגו', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Chaconia (Warszewiczia coccinea)', scientificNameHebrew: 'Chaconia (Warszewiczia coccinea)', gradientStops: ['#E61936', '#C3152D', '#A11125', '#7E0D1D'] },
  { country: 'United States', countryHebrew: 'ארצות הברית', continent: 'North America', continentHebrew: 'צפון אמריקה', scientificName: 'Rose (Rosa sp.)', scientificNameHebrew: 'Rose (Rosa sp.)', gradientStops: ['#C21807', '#A41405', '#871004', '#6A0D03'] },
  { country: 'Argentina', countryHebrew: 'ארגנטינה', continent: 'South America', continentHebrew: 'דרום אמריקה', scientificName: 'Ceibo (Erythrina crista-galli)', scientificNameHebrew: 'Ceibo (Erythrina crista-galli)', gradientStops: ['#F6F9E1', '#E48279', '#D20A11', '#730509'] },
  { country: 'Bolivia', countryHebrew: 'בוליביה', continent: 'South America', continentHebrew: 'דרום אמריקה', scientificName: 'Kantuta (Cantua buxifolia)', scientificNameHebrew: 'Kantuta (Cantua buxifolia)', gradientStops: ['#FF007F', '#D8006B', '#B20058', '#8C0045'] },
  { country: 'Brazil', countryHebrew: 'ברזיל', continent: 'South America', continentHebrew: 'דרום אמריקה', scientificName: 'Golden Trumpet (Handroanthus albus)', scientificNameHebrew: 'Golden Trumpet (Handroanthus albus)', gradientStops: ['#FFD700', '#D8B600', '#B29600', '#8C7600'] },
  { country: 'Chile', countryHebrew: 'צ\'ילה', continent: 'South America', continentHebrew: 'דרום אמריקה', scientificName: 'Copihue (Lapageria rosea)', scientificNameHebrew: 'Copihue (Lapageria rosea)', gradientStops: ['#E6C397', '#FFBDF4', '#C1074B', '#9D316D'] },
  { country: 'Colombia', countryHebrew: 'קולומביה', continent: 'South America', continentHebrew: 'דרום אמריקה', scientificName: 'Cattleya Orchid (Cattleya trianae)', scientificNameHebrew: 'Cattleya Orchid (Cattleya trianae)', gradientStops: ['#DA70D6', '#B95FB5', '#984E95', '#773D75'] },
  { country: 'Ecuador', countryHebrew: 'אקוודור', continent: 'South America', continentHebrew: 'דרום אמריקה', scientificName: 'Rose (Rosa sp.)', scientificNameHebrew: 'Rose (Rosa sp.)', gradientStops: ['#E0115F', '#BE0E50', '#9C0B42', '#7B0934'] },
  { country: 'Guyana', countryHebrew: 'גיאנה', continent: 'South America', continentHebrew: 'דרום אמריקה', scientificName: 'Victoria Amazonica (Victoria amazonica)', scientificNameHebrew: 'Victoria Amazonica (Victoria amazonica)', gradientStops: ['#A0D6F9', '#88B5D3', '#7095AE', '#587588'] },
  { country: 'Paraguay', countryHebrew: 'פרגוואי', continent: 'South America', continentHebrew: 'דרום אמריקה', scientificName: 'Passion Flower (Passiflora caerulea)', scientificNameHebrew: 'Passion Flower (Passiflora caerulea)', gradientStops: ['#9370DB', '#7C5FBA', '#664E99', '#503D78'] },
  { country: 'Peru', countryHebrew: 'פרו', continent: 'South America', continentHebrew: 'דרום אמריקה', scientificName: 'Cantuta (Cantua buxifolia)', scientificNameHebrew: 'Cantuta (Cantua buxifolia)', gradientStops: ['#FF007F', '#D8006B', '#B20058', '#8C0045'] },
  { country: 'Suriname', countryHebrew: 'סורינאם', continent: 'South America', continentHebrew: 'דרום אמריקה', scientificName: 'Fajalobie (Ixora coccinea)', scientificNameHebrew: 'Fajalobie (Ixora coccinea)', gradientStops: ['#E61936', '#C3152D', '#A11125', '#7E0D1D'] },
  { country: 'Uruguay', countryHebrew: 'אורוגוואי', continent: 'South America', continentHebrew: 'דרום אמריקה', scientificName: 'Ceibo (Erythrina crista-galli)', scientificNameHebrew: 'Ceibo (Erythrina crista-galli)', gradientStops: ['#F6F9E1', '#E48279', '#D20A11', '#730509'] },
  { country: 'Venezuela', countryHebrew: 'ונצואלה', continent: 'South America', continentHebrew: 'דרום אמריקה', scientificName: 'Orchid (Cattleya mossiae)', scientificNameHebrew: 'Orchid (Cattleya mossiae)', gradientStops: ['#DA70D6', '#B95FB5', '#984E95', '#773D75'] },
  { country: 'Australia', countryHebrew: 'אוסטרליה', continent: 'Oceania', continentHebrew: 'אוקיאניה', scientificName: 'Golden Wattle (Acacia pycnantha)', scientificNameHebrew: 'Golden Wattle (Acacia pycnantha)', gradientStops: ['#FFD700', '#D8B600', '#B29600', '#8C7600'] },
  { country: 'Fiji', countryHebrew: 'פיג\'י', continent: 'Oceania', continentHebrew: 'אוקיאניה', scientificName: 'Tagimaucia (Medinilla waterhousei)', scientificNameHebrew: 'Tagimaucia (Medinilla waterhousei)', gradientStops: ['#FF69B4', '#D85999', '#B2497D', '#8C3963'] },
  { country: 'Kiribati', countryHebrew: 'קיריבטי', continent: 'Oceania', continentHebrew: 'אוקיאניה', scientificName: 'Frangipani (Plumeria rubra)', scientificNameHebrew: 'Frangipani (Plumeria rubra)', gradientStops: ['#FFB7C5', '#D89BA7', '#B28089', '#8C646C'] },
  { country: 'Marshall Islands', countryHebrew: 'איי מרשל', continent: 'Oceania', continentHebrew: 'אוקיאניה', scientificName: 'Frangipani (Plumeria rubra)', scientificNameHebrew: 'Frangipani (Plumeria rubra)', gradientStops: ['#FFB7C5', '#D89BA7', '#B28089', '#8C646C'] },
  { country: 'Micronesia', countryHebrew: 'מיקרונזיה', continent: 'Oceania', continentHebrew: 'אוקיאניה', scientificName: 'Plumeria (Plumeria rubra)', scientificNameHebrew: 'Plumeria (Plumeria rubra)', gradientStops: ['#FFB7C5', '#D89BA7', '#B28089', '#8C646C'] },
  { country: 'Nauru', countryHebrew: 'נאורו', continent: 'Oceania', continentHebrew: 'אוקיאניה', scientificName: 'Tomano Flower (Calophyllum inophyllum)', scientificNameHebrew: 'Tomano Flower (Calophyllum inophyllum)', gradientStops: ['#66CDAA', '#56AE90', '#478F76', '#38705D'] },
  { country: 'New Zealand', countryHebrew: 'ניו זילנד', continent: 'Oceania', continentHebrew: 'אוקיאניה', scientificName: 'Kowhai (Sophora microphylla)', scientificNameHebrew: 'Kowhai (Sophora microphylla)', gradientStops: ['#FFD700', '#D8B600', '#B29600', '#8C7600'] },
  { country: 'Palau', countryHebrew: 'פלאו', continent: 'Oceania', continentHebrew: 'אוקיאניה', scientificName: 'Yellow Rose (Rosa sp.)', scientificNameHebrew: 'Yellow Rose (Rosa sp.)', gradientStops: ['#FFD800', '#D8B700', '#B29700', '#8C7600'] },
  { country: 'Papua New Guinea', countryHebrew: 'פפואה גינאה החדשה', continent: 'Oceania', continentHebrew: 'אוקיאניה', scientificName: 'Dendrobium Orchid (Dendrobium lasianthera)', scientificNameHebrew: 'Dendrobium Orchid (Dendrobium lasianthera)', gradientStops: ['#DA70D6', '#B95FB5', '#984E95', '#773D75'] },
  { country: 'Samoa', countryHebrew: 'סמואה', continent: 'Oceania', continentHebrew: 'אוקיאניה', scientificName: 'Teuila (Alpinia purpurata)', scientificNameHebrew: 'Teuila (Alpinia purpurata)', gradientStops: ['#FF007F', '#D8006B', '#B20058', '#8C0045'] },
  { country: 'Solomon Islands', countryHebrew: 'איי שלמה', continent: 'Oceania', continentHebrew: 'אוקיאניה', scientificName: 'Frangipani (Plumeria rubra)', scientificNameHebrew: 'Frangipani (Plumeria rubra)', gradientStops: ['#FFB7C5', '#D89BA7', '#B28089', '#8C646C'] },
  { country: 'Tonga', countryHebrew: 'טונגה', continent: 'Oceania', continentHebrew: 'אוקיאניה', scientificName: 'Red Ginger (Alpinia purpurata)', scientificNameHebrew: 'Red Ginger (Alpinia purpurata)', gradientStops: ['#FF007F', '#D8006B', '#B20058', '#8C0045'] },
  { country: 'Tuvalu', countryHebrew: 'טובלו', continent: 'Oceania', continentHebrew: 'אוקיאניה', scientificName: 'Plumeria (Plumeria rubra)', scientificNameHebrew: 'Plumeria (Plumeria rubra)', gradientStops: ['#FFB7C5', '#D89BA7', '#B28089', '#8C646C'] },
  { country: 'Vanuatu', countryHebrew: 'ונואטו', continent: 'Oceania', continentHebrew: 'אוקיאניה', scientificName: 'Hibiscus (Hibiscus rosa-sinensis)', scientificNameHebrew: 'Hibiscus (Hibiscus rosa-sinensis)', gradientStops: ['#D2042D', '#B20326', '#93021F', '#730218'] }
];

export const questions: Question[] = [
  { id: 'name', label: 'שם', type: 'text' },
  { id: 'genderIdentity', label: 'זהות מגדרית', type: 'tabs', options: ['גבר', 'אשה', 'א-בינארי', 'גבר טראנס', 'אשה טראנסית', 'ללא הגדרה'] },
  { id: 'origin_p1_grandpa', label: 'מה המוצא של סבא מצד הורה 1?', type: 'country_select' },
  { id: 'origin_p1_grandma', label: 'מה המוצא של סבתא מצד הורה 1?', type: 'country_select' },
  { id: 'origin_p2_grandpa', label: 'מה המוצא של סבא מצד הורה 2?', type: 'country_select' },
  { id: 'origin_p2_grandma', label: 'מה המוצא של סבתא מצד הורה 2?', type: 'country_select' },
  { id: 'belonging', label: 'לאיזה צד אתה מרגיש יותר שייך?', type: 'range', options: ['הורה 1', 'מרגיש שייכות באותה מידה', 'הורה 2'] },
  { id: 'countryToLive', label: 'באיזו מדינה היית רוצה לגור?', type: 'country_select' },
  { id: 'languageToSpeak', label: 'איזו שפה היית רוצה לדבר?', type: 'language_select' },
  { id: 'favoriteCuisine', label: 'איזה מטבח אתה אוהב?', type: 'country_select' },
  { id: 'cultureToBelong', label: 'לאיזו תרבות היית רוצה להשתייך?', type: 'country_select' },
  { id: 'childhoodEnvironment', label: 'באיזו סביבה גדלת?', type: 'tabs', options: ['עיר', 'מושב', 'קיבוץ', 'אחר'] },
  { id: 'sexualOrientation', label: 'נטייה מינית', type: 'tabs', options: ['הטרוסקסואל', 'הומוסקסואל', 'ביסקסואל', 'א-מיני', 'פאנסקסואל'] },
  { id: 'religion', label: 'דת', type: 'tabs', options: ['יהודי', 'נוצרי', 'מוסלמי', 'בודהיסט', 'אתאיסט'] },
  { id: 'politicalView', label: 'השקפה פוליטית', type: 'tabs', options: ['שמאל', 'שמאל מרכז', 'מרכז', 'ימין מרכז', 'ימין'] },
  { id: 'diet', label: 'תזונה', type: 'tabs', options: ['אוכל הכל', 'טבעוני', 'צמחוני', 'אוכל כשרות'] },
];

export const petalShapes: Record<string, () => JSX.Element> = {
  'Africa': () => (
    <g transform="translate(-62.5, -120)">
      <path d="M124.946 15.847C124.946 66.767 97.1873 240 62.9457 240C28.704 240 0.945679 66.767 0.945679 15.847C0.945679 -35.0729 28.704 53.0075 62.9457 53.0075C97.1873 53.0075 124.946 -35.0729 124.946 15.847Z" fill="#9D9D9D" /><path d="M120.319 0.873047C120.933 0.658364 121.368 0.721024 121.732 0.976562C122.144 1.26626 122.589 1.88819 122.982 3.06055C123.766 5.40052 124.202 9.48619 124.203 15.8467C124.203 41.2316 117.275 97.2113 106.062 146.854C100.456 171.674 93.7877 194.867 86.3978 211.84C82.7013 220.33 78.8412 227.222 74.8705 231.98C70.8866 236.754 66.8968 239.257 62.9457 239.257C58.9946 239.257 55.0048 236.754 51.0209 231.98C47.0502 227.222 43.19 220.33 39.4935 211.84C32.1036 194.867 25.4356 171.674 19.8295 146.854C8.6165 97.2113 1.68884 41.2316 1.68884 15.8467C1.68886 9.48619 2.12555 5.40053 2.90955 3.06055C3.30238 1.8882 3.74687 1.26627 4.15955 0.976562C4.52378 0.721025 4.95859 0.658366 5.57263 0.873047C6.21933 1.09915 7.00434 1.61794 7.93103 2.4541C8.84861 3.28205 9.86016 4.37914 10.9633 5.70312C13.1709 8.35289 15.6924 11.8453 18.5013 15.7646C24.102 23.5794 30.8175 33.0518 38.2855 40.5645C45.7336 48.0571 54.0735 53.75 62.9457 53.75C71.8179 53.75 80.1577 48.0571 87.6058 40.5645C95.0738 33.0518 101.789 23.5794 107.39 15.7646C110.199 11.8453 112.72 8.35289 114.928 5.70312C116.031 4.37914 117.043 3.28205 117.96 2.4541C118.887 1.61794 119.672 1.09915 120.319 0.873047Z" stroke="#F7F0E6" strokeOpacity="0.8" strokeWidth="1.48588" />
    </g>
  ),
  'Asia': () => (
    <g transform="translate(-62.5, -107)">
      <path d="M125.377 62.3594C125.377 96.7995 97.4364 213.967 62.9699 213.967C28.5035 213.967 0.562866 96.7995 0.562866 62.3594C0.562866 27.9192 19.0339 0 53.5004 0C55.0211 0 60.1567 22.3513 65.5004 22.4582C71.5428 22.579 77.8514 0.470076 79.5004 0.722569C109.443 5.30741 125.377 31.1572 125.377 62.3594Z" fill="#9D9D9D" />
      <path d="M53.265 0.744141C53.3415 0.856211 53.4422 1.03233 53.5648 1.28516C53.8442 1.86152 54.1797 2.70554 54.5687 3.75293C55.3323 5.80893 56.3052 8.66321 57.3724 11.4541C58.446 14.2614 59.6555 17.1158 60.9467 19.2842C61.5913 20.3669 62.2767 21.3132 63.0013 22.001C63.7195 22.6825 64.5538 23.1825 65.4857 23.2012C66.4755 23.2209 67.3989 22.7842 68.2279 22.1328C69.0591 21.4797 69.8553 20.5649 70.6097 19.5098C72.119 17.3988 73.5488 14.6016 74.8217 11.8535C76.0851 9.12581 77.2473 6.32359 78.1439 4.33496C78.6022 3.31854 78.9933 2.5087 79.3129 1.9668C79.4434 1.74539 79.5492 1.59248 79.6283 1.49512C108.939 6.10806 124.634 31.4787 124.634 62.3594C124.634 79.4678 117.674 117.285 106.394 150.842C100.756 167.615 94.0556 183.27 86.6381 194.718C82.9294 200.441 79.0604 205.082 75.0814 208.286C71.1046 211.488 67.0576 213.224 62.9701 213.224C58.8825 213.224 54.8357 211.488 50.8588 208.286C46.8798 205.082 43.0109 200.441 39.3021 194.718C31.8846 183.27 25.1834 167.615 19.5453 150.842C8.26517 117.285 1.30603 79.4678 1.30603 62.3594C1.30603 45.2632 5.8916 29.8488 14.6898 18.7256C23.432 7.67331 36.3703 0.807314 53.265 0.744141Z" stroke="#F7F0E6" strokeOpacity="0.8" strokeWidth="1.48588" />
    </g>
  ),
  'Europe': () => (
    <g transform="translate(-62.5, -107)">
      <path d="M125.377 62.3594C125.377 96.7995 97.4364 213.967 62.9699 213.967C28.5035 213.967 0.562897 96.7995 0.562897 62.3594C0.562897 27.9192 28.5035 0 62.9699 0C97.4364 0 125.377 27.9192 125.377 62.3594Z" fill="#9D9D9D" />
      <path d="M62.9701 0.743164C97.0267 0.743265 124.634 28.3302 124.634 62.3594C124.634 79.4677 117.674 117.285 106.394 150.842C100.756 167.615 94.0556 183.27 86.6381 194.718C82.9294 200.441 79.0604 205.082 75.0814 208.286C71.1046 211.488 67.0576 213.224 62.9701 213.224C58.8826 213.224 54.8357 211.488 50.8588 208.286C46.8798 205.082 43.0109 200.441 39.3022 194.718C31.8846 183.27 25.1835 167.615 19.5453 150.842C8.2652 117.285 1.30606 79.4677 1.30606 62.3594C1.30606 28.3301 28.9134 0.743164 62.9701 0.743164Z" stroke="#F7F0E6" strokeOpacity="0.8" strokeWidth="1.48588" />
    </g>
  ),
  'North America': () => (
    <g transform="translate(-62.5, -107)">
      <path d="M125.377 62.3594C125.377 96.7995 97.4364 213.967 62.97 213.967C28.5035 213.967 0.562927 96.7995 0.562927 62.3594C0.562927 51.0751 17.7031 54.6315 22.9489 45.5C33.7135 26.7617 39.7964 0 62.97 0C86.1435 0 91.7983 27.1898 102.563 45.9281C107.809 55.0596 125.377 51.0751 125.377 62.3594Z" fill="#9D9D9D" />
      <path d="M62.9702 0.743164C74.1833 0.743235 81.1928 7.28577 86.7885 16.3281C89.5898 20.8549 92.0128 25.9717 94.4203 31.1592C96.8209 36.3316 99.2075 41.5789 101.918 46.2978C103.337 48.7666 105.572 50.3161 108.033 51.4375C110.475 52.5505 113.237 53.282 115.718 54.0469C118.248 54.8265 120.483 55.6392 122.091 56.9004C123.647 58.1208 124.634 59.775 124.634 62.3594C124.634 79.4677 117.674 117.285 106.394 150.842C100.756 167.615 94.0556 183.27 86.6381 194.718C82.9294 200.441 79.0604 205.082 75.0815 208.286C71.1046 211.488 67.0576 213.224 62.9702 213.224C58.8826 213.224 54.8357 211.488 50.8588 208.286C46.8798 205.082 43.0109 200.441 39.3022 194.718C31.8847 183.27 25.1835 167.615 19.5453 150.842C8.26523 117.285 1.30609 79.4677 1.30609 62.3594C1.30609 59.7668 2.27277 58.0808 3.79633 56.8213C5.36755 55.5224 7.55215 54.6587 10.0258 53.8262C12.4531 53.0092 15.1608 52.2226 17.56 51.0693C19.978 49.907 22.179 48.3319 23.5932 45.8701C26.3024 41.1542 28.7158 35.9355 31.1557 30.8047C33.6025 25.6592 36.0785 20.5958 38.9321 16.123C44.6319 7.18929 51.7485 0.743164 62.9702 0.743164Z" stroke="#F7F0E6" strokeOpacity="0.8" strokeWidth="1.48588" />
    </g>
  ),
  'South America': () => (
    <g transform="translate(-62.5, -107)">
      <path d="M125.377 62.3594C125.377 96.7995 97.4364 213.967 62.9699 213.967C28.5035 213.967 0.562866 96.7995 0.562866 62.3594C0.562866 35.1481 16.5618 14.8748 40.8839 6.35938C44.1783 5.20599 42.262 15.8176 45.7826 13.8594C49.167 11.9769 59.424 0 62.9699 0C66.5483 0 74.3689 11.9542 77.7826 13.8594C81.2704 15.8059 81.0171 5.21616 84.2824 6.35938C108.605 14.8748 125.377 35.1481 125.377 62.3594Z" fill="#9D9D9D" />
      <path d="M62.9701 0.743164C63.2246 0.743218 63.6019 0.855394 64.1175 1.1582C64.6217 1.45427 65.1935 1.89354 65.8197 2.45215C67.0722 3.56946 68.4656 5.09281 69.8793 6.70508C71.2787 8.30118 72.7078 9.99657 73.9828 11.3916C75.2386 12.7656 76.4448 13.9633 77.4203 14.5078C77.9857 14.8234 78.5729 14.9332 79.1449 14.7598C79.6918 14.5939 80.1 14.2056 80.4076 13.7891C81.0066 12.9777 81.4386 11.7514 81.8177 10.6533C82.2209 9.48578 82.5767 8.4255 83.014 7.70996C83.2294 7.35767 83.4196 7.16706 83.5736 7.08008C83.6915 7.0135 83.8215 6.98535 84.0365 7.06055C108.098 15.4847 124.634 35.5018 124.634 62.3594C124.634 79.4677 117.674 117.285 106.394 150.842C100.756 167.615 94.0556 183.27 86.6381 194.718C82.9294 200.441 79.0604 205.082 75.0814 208.286C71.1046 211.488 67.0576 213.224 62.9701 213.224C58.8825 213.224 54.8357 211.488 50.8588 208.286C46.8798 205.082 43.0109 200.441 39.3021 194.718C31.8846 183.27 25.1834 167.615 19.5453 150.842C8.26517 117.285 1.30603 79.4677 1.30603 62.3594C1.30603 35.4866 17.0831 15.4794 41.1293 7.06055C41.3638 6.97843 41.4467 7.02475 41.4896 7.05273C41.5775 7.11003 41.7134 7.26279 41.8597 7.60937C42.1554 8.30993 42.3218 9.35914 42.515 10.5322C42.6944 11.6215 42.9029 12.8647 43.3373 13.6953C43.5613 14.1236 43.9062 14.5647 44.4535 14.7539C45.0171 14.9486 45.5998 14.8114 46.1439 14.5088C47.0836 13.9861 48.4262 12.8166 49.9027 11.4443C51.3894 10.0626 53.1326 8.35745 54.8246 6.76465C56.5376 5.15201 58.2343 3.61921 59.7142 2.49219C60.4546 1.92841 61.1236 1.47931 61.6996 1.1748C62.2929 0.861189 62.7105 0.743164 62.9701 0.743164Z" stroke="#F7F0E6" strokeOpacity="0.8" strokeWidth="1.48588" />
    </g>
  ),
  'Oceania': () => (
    <g transform="translate(-62.5, -107)">
      <path d="M125.377 62.3594C125.377 96.7995 97.4364 213.967 62.9699 213.967C28.5035 213.967 0.562866 96.7995 0.562866 62.3594C0.562866 48.0482 5.38738 20.517 13.4999 9.99316C19.2618 2.51858 31.5054 28.7326 40.0341 24.4932C48.395 20.3371 52.9978 0 62.9699 0C73.05 0 77.5719 20.2524 85.9999 24.4932C94.4731 28.7566 106.841 2.68227 112.558 10.1471C120.599 20.6454 125.377 48.1179 125.377 62.3594Z" fill="#9D9D9D" />
      <path d="M62.9701 0.743164C65.2171 0.743224 67.2122 1.86527 69.1117 3.75684C71.0168 5.654 72.7511 8.25105 74.472 11.0459C76.1748 13.8113 77.8717 16.7858 79.6566 19.3066C81.4387 21.8236 83.3896 24.0116 85.6664 25.1572C88.1801 26.4217 90.868 25.3642 93.35 23.6064C95.8596 21.829 98.4313 19.1443 100.848 16.6348C103.304 14.0842 105.582 11.7362 107.585 10.4668C108.584 9.83401 109.423 9.5307 110.115 9.53809C110.754 9.54501 111.37 9.81808 111.968 10.5986C115.882 15.7081 119.06 25.0594 121.257 35.0098C123.448 44.9297 124.634 55.3036 124.634 62.3594C124.634 79.4678 117.674 117.285 106.394 150.842C100.756 167.615 94.0556 183.27 86.6381 194.718C82.9294 200.441 79.0604 205.082 75.0814 208.286C71.1046 211.488 67.0576 213.224 62.9701 213.224C58.8825 213.224 54.8357 211.488 50.8588 208.286C46.8798 205.082 43.0109 200.441 39.3021 194.718C31.8846 183.27 25.1834 167.615 19.5453 150.842C8.26517 117.285 1.30603 79.4678 1.30603 62.3594C1.30603 55.2691 2.50314 44.8633 4.71423 34.917C6.93208 24.9404 10.1398 15.5684 14.0883 10.4463C14.6917 9.66357 15.311 9.39156 15.9506 9.38672C16.6426 9.38161 17.4806 9.68867 18.4769 10.3271C20.4757 11.6081 22.7447 13.9727 25.1918 16.542C27.5995 19.0699 30.1618 21.7751 32.6683 23.5693C35.1476 25.344 37.8364 26.4149 40.3646 25.1582C42.6274 24.0334 44.5709 21.854 46.349 19.3418C48.1306 16.8246 49.8283 13.8484 51.5306 11.0771C53.2509 8.27664 54.9838 5.67081 56.8812 3.7666C58.774 1.86705 60.7535 0.743164 62.9701 0.743164Z" stroke="#F7F0E6" strokeOpacity="0.8" strokeWidth="1.48588" />
    </g>
  ),
  'default': () => (
    <g transform="translate(-62.5, -120)">
      <path d="M124.946 15.847C124.946 66.767 97.1873 240 62.9457 240C28.704 240 0.945679 66.767 0.945679 15.847C0.945679 -35.0729 28.704 53.0075 62.9457 53.0075C97.1873 53.0075 124.946 -35.0729 124.946 15.847Z" fill="#9D9D9D" /><path d="M120.319 0.873047C120.933 0.658364 121.368 0.721024 121.732 0.976562C122.144 1.26626 122.589 1.88819 122.982 3.06055C123.766 5.40052 124.202 9.48619 124.203 15.8467C124.203 41.2316 117.275 97.2113 106.062 146.854C100.456 171.674 93.7877 194.867 86.3978 211.84C82.7013 220.33 78.8412 227.222 74.8705 231.98C70.8866 236.754 66.8968 239.257 62.9457 239.257C58.9946 239.257 55.0048 236.754 51.0209 231.98C47.0502 227.222 43.19 220.33 39.4935 211.84C32.1036 194.867 25.4356 171.674 19.8295 146.854C8.6165 97.2113 1.68884 41.2316 1.68884 15.8467C1.68886 9.48619 2.12555 5.40053 2.90955 3.06055C3.30238 1.8882 3.74687 1.26627 4.15955 0.976562C4.52378 0.721025 4.95859 0.658366 5.57263 0.873047C6.21933 1.09915 7.00434 1.61794 7.93103 2.4541C8.84861 3.28205 9.86016 4.37914 10.9633 5.70312C13.1709 8.35289 15.6924 11.8453 18.5013 15.7646C24.102 23.5794 30.8175 33.0518 38.2855 40.5645C45.7336 48.0571 54.0735 53.75 62.9457 53.75C71.8179 53.75 80.1577 48.0571 87.6058 40.5645C95.0738 33.0518 101.789 23.5794 107.39 15.7646C110.199 11.8453 112.72 8.35289 114.928 5.70312C116.031 4.37914 117.043 3.28205 117.96 2.4541C118.887 1.61794 119.672 1.09915 120.319 0.873047Z" stroke="#F7F0E6" strokeOpacity="0.8" strokeWidth="1.48588" />
    </g>
  )
};

const commonShapeProps = {
  fill: "#fff",
  strokeWidth: 0.5,
  strokeOpacity: 0.8,
  stroke: "#F7F0E6",
};

// Center shapes based on Gender Identity
export const centerShapes: Record<string, () => JSX.Element> = {
  'אשה': () => (
    <g transform="translate(-38.5, -38) scale(0.6)">
      <rect x="124.412" y="85.3914" width="27.3539" height="120.734" rx="13.6769" transform="rotate(135 124.412 85.3914)" {...commonShapeProps} />
      <rect x="105.042" y="104.758" width="27.3539" height="120.734" rx="13.6769" transform="rotate(135 105.042 104.758)" {...commonShapeProps} />
      <rect x="39.0603" y="124.1" width="27.3539" height="120.734" rx="13.6769" transform="rotate(-135 39.0603 124.1)" {...commonShapeProps} />
      <rect x="19.6941" y="104.731" width="27.3539" height="120.734" rx="13.6769" transform="rotate(-135 19.6941 104.731)" {...commonShapeProps} />
    </g>
  ),

  'גבר': () => (
    <g transform="rotate(45)">
      <rect x="-30" y="-30" width="60" height="60" rx="10" {...commonShapeProps} />
    </g>
  ),

  'א-בינארי': () => (
    <g>
      <rect x="-30" y="-30" width="60" height="60" rx="10" {...commonShapeProps} />
    </g>
  ),

  'גבר טראנס': () => (
    <g>
      <rect x="-33" y="-33" width="66" height="66" rx="10" {...commonShapeProps} />
      <g transform="rotate(45)">
        <rect x="-33" y="-33" width="66" height="66" rx="10" {...commonShapeProps} />
      </g>
    </g>
  ),

  'אשה טראנסית': () => (
    <g transform="translate(-52.5, -52) scale(0.6)">
      <rect x="115.768" y="148.419" width="27.3539" height="120.734" rx="13.6769" transform="rotate(180 115.768 148.419)" {...commonShapeProps} />
      <rect x="88.3794" y="148.419" width="27.3539" height="120.734" rx="13.6769" transform="rotate(180 88.3794 148.419)" {...commonShapeProps} />
      <rect x="28.0459" y="115.441" width="27.3539" height="120.734" rx="13.6769" transform="rotate(-90 28.0459 115.441)" {...commonShapeProps} />
      <rect x="28.0459" y="88.0522" width="27.3539" height="120.734" rx="13.6769" transform="rotate(-90 28.0459 88.0522)" {...commonShapeProps} />
    </g>
  ),

  // A perfectly centered circle.
  'ללא הגדרה': () => (
    <g>
      <circle cx="0" cy="0" r="33" {...commonShapeProps} />
    </g>
  ),
};

// Accents on top of outer petals, based on Sexual Orientation
export const sexualOrientationAccents: Record<string, (props: { fill: string }) => JSX.Element> = {
  'הטרוסקסואל': ({ fill }) => (
    <g transform="translate(-36.5, -32) scale(0.6) rotate(0)">
      <rect x="29.3596" y="9.47302" width="3.72787" height="11.8049" rx="1.86393" transform="rotate(45 29.3596 9.47302)" fill={fill} strokeWidth={0} />
      <rect x="17.9368" y="20.8984" width="3.72787" height="11.8049" rx="1.86393" transform="rotate(45 17.9368 20.8984)" fill={fill} strokeWidth={0} />
      <rect x="20.1299" y="17.8228" width="3.72787" height="11.8049" rx="1.86393" transform="rotate(135 20.1299 17.8228)" fill={fill} strokeWidth={0} />
      <rect x="31.9949" y="29.683" width="3.72787" height="11.8049" rx="1.86393" transform="rotate(135 31.9949 29.683)" fill={fill} strokeWidth={0} />
    </g>
  ),
  'הומוסקסואל': ({ fill }) => (
    <g transform="translate(-25, -40) scale(0.6) rotate(45)">
      <rect x="29.3596" y="9.47302" width="3.72787" height="11.8049" rx="1.86393" transform="rotate(45 29.3596 9.47302)" fill={fill} strokeWidth={0} />
      <rect x="17.9368" y="20.8984" width="3.72787" height="11.8049" rx="1.86393" transform="rotate(45 17.9368 20.8984)" fill={fill} strokeWidth={0} />
      <rect x="20.1299" y="17.8228" width="3.72787" height="11.8049" rx="1.86393" transform="rotate(135 20.1299 17.8228)" fill={fill} strokeWidth={0} />
      <rect x="31.9949" y="29.683" width="3.72787" height="11.8049" rx="1.86393" transform="rotate(135 31.9949 29.683)" fill={fill} strokeWidth={0} />
    </g>
  ),
  'ביסקסואל': ({ fill }) => (
    <g transform="translate(-25, -33) scale(0.55) rotate(45)">
      <rect x="29.3596" y="9.47302" width="3.72787" height="11.8049" rx="1.86393" transform="rotate(45 29.3596 9.47302)" fill={fill} strokeWidth={0} />
      <rect x="17.9368" y="20.8984" width="3.72787" height="11.8049" rx="1.86393" transform="rotate(45 17.9368 20.8984)" fill={fill} strokeWidth={0} />
      <rect x="20.1299" y="17.8228" width="3.72787" height="11.8049" rx="1.86393" transform="rotate(135 20.1299 17.8228)" fill={fill} strokeWidth={0} />
    </g>
  ),
  'א-מיני': ({ fill }) => (
    <g transform="translate(-36.5, -25) scale(0.6) rotate(0)">
      <rect width="3.72787" height="11.8049" rx="1.86393" transform="matrix(1 0 0 -1 17.7126 12.6823)" fill={fill} strokeWidth={0} />
    </g>
  ),
  'פאנסקסואל': ({ fill }) => (
    <g transform="translate(-36.5, -25) scale(0.6) rotate(0)">
      <rect width="3.72787" height="11.8049" rx="1.86393" transform="matrix(1 0 0 -1 17.7126 12.6823)" fill={fill} strokeWidth={0} />
      <rect width="3.72787" height="11.8049" rx="1.86393" transform="matrix(-0.5 -0.866025 -0.866025 0.5 38.7498 10.2626)" fill={fill} strokeWidth={0} />
      <rect x="0.39917" y="10.2626" width="3.72787" height="11.8049" rx="1.86393" transform="rotate(-60 0.39917 10.2626)" fill={fill} strokeWidth={0} />
    </g>
  ),
};

// Accents between petals, based on Religion
export const religionAccents: Record<string, React.ReactElement> = {
  'יהודי': React.createElement('circle', { r: 1 }),
  'נוצרי': React.createElement('path', { d: "M-1.5,0 L1.5,0 M0,-1.5 L0,1.5" }),
  'מוסלמי': React.createElement('path', { d: "M-1,2 A2.5 2.5 0 1 0 1.5 -1.5" }), // Crescent
  'בודהיסט': React.createElement('circle', { r: 1, strokeWidth: 0.5, stroke: "#333", fill: "none" }), // Open circle
  'אתאיסט': React.createElement(React.Fragment, null), // No accent
};

// Side accents on horizontal petals, based on Political View
export const politicalViewAccents: Record<string, { left: number, right: number }> = {
  'שמאל': { left: 2, right: 0 },
  'שמאל מרכז': { left: 2, right: 1 },
  'מרכז': { left: 1, right: 1 },
  'ימין מרכז': { left: 1, right: 2 },
  'ימין': { left: 0, right: 2 },
};

// Accents between petals, based on Diet
export const dietAccents: Record<string, React.ReactElement> = {
  'אוכל הכל': React.createElement('path', { d: "M0,-2 L2,0 L0,2 L-2,0 Z" }), // Diamond
  'טבעוני': React.createElement('path', { d: "M0,-2 L2,1.5 L-2,1.5 Z" }), // Triangle
  'צמחוני': React.createElement('circle', { r: "1.5" }), // Circle
  'אוכל כשרות': React.createElement(
    'g',
    null,
    React.createElement('path', { d: "M-1,-1 L0,-2 L1,-1 L0,0 Z" }),
    React.createElement('path', { d: "M-1,1 L0,2 L1,1 L0,0 Z" })
  ), // Two small diamonds
};

// Dots inside inner petals, based on Childhood Environment
export const childhoodEnvironmentAccents: Record<string, React.ReactElement> = {
  'עיר': ( // City - Uses the shape you provided
    <g transform="translate(-7.5, 55)">
      <rect x="8.4" y="3.04" width="3.73" height="11.8" rx="1.86" transform="rotate(180 8.4 3.04)" fill="#fff" strokeWidth="0" />
      <circle cx="19" cy="-5" r="1.74" transform="rotate(-180 12.78 1.84)" fill="#fff" strokeWidth="0" />
    </g>
  ),
  'מושב': ( // Moshav - Two vertical dots
    <g transform="translate(-13, 50) rotate(-45)">
      <rect x="8.98169" y="11.8398" width="1.89025" height="5.9858" rx="0.945127" transform="rotate(-135 8.98169 11.8398)" fill="#fff" strokeWidth="0" />
      <rect x="2.30566" y="3.42432" width="1.89025" height="5.9858" rx="0.945127" transform="rotate(-15 2.30566 3.42432)" fill="#fff" strokeWidth="0" />
      <rect width="1.89025" height="5.9858" rx="0.945127" transform="matrix(0.258819 -0.965926 -0.965926 -0.258819 16.0586 17.1769)" fill="#fff" strokeWidth="0" />
    </g>
  ),
  'קיבוץ': ( // Kibbutz - Three dots in a triangle
    <g transform="translate(-7.5, 55) rotate(-45)">
      <circle cx="8.43894" cy="10.6223" r="1.24384" transform="rotate(135 8.43894 10.6223)" fill="#fff" strokeWidth="0" />
      <circle cx="2.28196" cy="4.46539" r="1.24384" transform="rotate(135 2.28196 4.46539)" fill="#fff" strokeWidth="0" />
      <rect x="7.30078" y="6.33929" width="1.89025" height="5.9858" rx="0.945127" transform="rotate(-135 7.30078 6.33929)" fill="#fff" strokeWidth="0" />
    </g>
  ),
  'אחר': ( // Other - A single larger dot
    <g transform="translate(0, 55)">
      <circle cx="0" cy="0" r="2.5" fill="#fff" strokeWidth="0" />
    </g>
  ),
};