import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient } from '@supabase/supabase-js'

@Module({
  providers: [
    {
      provide: 'SUPABASE_CLIENT',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('SUPABASE_URL')
        const key = config.get<string>('SUPABASE_SERVICE_ROLE_KEY')

        if (!url || !key) {
          throw new Error('Supabase env vars missing')
        }

        return createClient(url, key)
      },
    },
  ],
  exports: ['SUPABASE_CLIENT'],
})
export class SupabaseModule {}
