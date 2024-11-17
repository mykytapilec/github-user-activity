import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as https from 'https';

@Injectable()
export class GithubService {
  private readonly githubApiBaseUrl = 'https://api.github.com';

  async getUserActivity(username: string): Promise<any[]> {
    const url = `${this.githubApiBaseUrl}/users/${username}/events`;

    return new Promise((resolve, reject) => {
      const options = {
        headers: {
          'User-Agent': 'NestJS-GitHub-CLI', // Required by GitHub API
        },
      };

      https.get(url, options, (res) => {
        let data = '';

        // Accumulate data chunks
        res.on('data', (chunk) => {
          data += chunk;
        });

        // Handle end of response
        res.on('end', () => {
          if (res.statusCode === 200) {
            try {
              const events = JSON.parse(data);
              resolve(events.slice(0, 5)); // Return only the last 5 events
            } catch (error) {
              reject(
                new HttpException(
                  'Error parsing response from GitHub',
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
              );
            }
          } else if (res.statusCode === 404) {
            reject(
              new HttpException('User not found', HttpStatus.NOT_FOUND),
            );
          } else {
            reject(
              new HttpException(
                `Failed to fetch data: ${res.statusCode} ${res.statusMessage}`,
                HttpStatus.BAD_REQUEST,
              ),
            );
          }
        });

        // Handle request errors
        res.on('error', (err) => {
          reject(
            new HttpException(
              `Error fetching data: ${err.message}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
          );
        });
      });
    });
  }
}
