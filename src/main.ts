import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GithubService } from './github/github.service';
import { Command } from 'commander';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const githubService = app.get(GithubService);

  const program = new Command();

  program
    .name('github-activity')
    .description('Fetch recent GitHub activity of a user')
    .argument('<username>', 'GitHub username')
    .action(async (username: string) => {
      try {
        console.log(`Fetching recent activity for user: ${username}...\n`);
        const activities = await githubService.getUserActivity(username);

        if (activities.length === 0) {
          console.log('No recent activity found for this user.');
          return;
        }

        console.log('Recent Activity:');
        activities.forEach((activity, index) => {
          console.log(
            `${index + 1}. Type: ${activity.type}, Repo: ${activity.repo.name}, Date: ${activity.created_at}`,
          );
        });
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    });

  program.parse(process.argv);
}

bootstrap();
