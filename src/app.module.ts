import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';
import * as path from 'path';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: false,
      autoSchemaFile: path.join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
    }),
    PostsModule,
    UsersModule,
  ],
})
export class AppModule { }
