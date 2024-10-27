import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { AuthorModule } from './author/author.module';
import { WorkModule } from './work/work.module';
import { TopicModule } from './topic/topic.module';
import { EssayModule } from './essay/essay.module';
import { Author } from './author/author.entity';
import { Topic } from './topic/topic.entity';
import { Work } from './work/work.entity';
import { Essay } from './essay/essay.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Author, Topic, Work, Essay],
        synchronize: true,
      }),
    }),
    AuthModule,
    AuthorModule,
    WorkModule,
    TopicModule,
    EssayModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
