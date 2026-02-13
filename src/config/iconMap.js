// src/config =>處理 規則、對照、顯示語意
import { Home, ShoppingBag, PlusSquare } from 'react-feather';

// 獨立檔案僅處理"icon對照"，非utils那種js邏輯需求
export const STORE_TYPE_ICON_MAP = {
  旅館: Home,
  賣家: ShoppingBag,
  診所: PlusSquare,
};

export const PET_ICON_MAP = {
  倉鼠: '🐹',
  柯爾鴨: '🦆',
  鸚鵡: '🦜',
  守宮: '🦎',
  刺蝟: '🦔',
};
