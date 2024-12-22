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

  public async uploadFile(fileName: string, file: Buffer) {
    return this.supabase.storage.from('art').upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: 'image/*',
    });
  }

  public async updateFile(oldName: string, newName: string, file: Buffer) {
    const { data, error: uploadError } = await this.supabase.storage
      .from('art')
      .upload(newName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'image/*',
      });

    if (uploadError) {
      return { data: data, error: uploadError };
    } else {
      const { error: deleteError } = await this.supabase.storage
        .from('art')
        .remove([oldName]);

      return { data, error: deleteError };
    }
  }

  public async deleteFile(name: string) {
    const { error } = await this.supabase.storage.from('art').remove([name]);

    return { error };
  }
}
