import { Expose } from 'class-transformer';
import { Account } from './account';
import { CharacterInventory } from './character-inventory';
import { ItemInventory } from './item-inventory';
import { StudyCategory } from './study-category';
import { StudyRecord } from './study-record';
import { StudyStreak } from './study-streak';
import { TransactionRecord } from './transaction-record';

export class Member {
  member_id: string;
  nickname: string;
  email: string;
  image_url: string | null;
  active_record_id: number | null;
  point: number;
  character_inventories?: CharacterInventory[];
  item_inventories?: ItemInventory[];
  study_categories?: StudyCategory[];
  study_records?: StudyRecord[];
  transaction_records?: TransactionRecord[];
  study_streak?: StudyStreak;
  account?: Account | null;

  @Expose({ groups: ['me', 'admin'] })
  created_at: Date;
  @Expose({ groups: ['admin'] })
  updated_at: Date;
  @Expose({ groups: ['admin'] })
  deleted_at: Date;
}