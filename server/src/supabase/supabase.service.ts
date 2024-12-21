import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  public async getUsers() {
    return this.supabase.from('users').select('*');
  }

  public async uploadFile(
    bucket: string,
    path: string,
    file: Buffer,
    options: any,
  ) {
    return this.supabase.storage.from(bucket).upload(path, file, options);
  }
}
