GitHub Activity CLI

This project is a command-line interface (CLI) application built using the NestJS framework. It fetches the recent activity of a specified GitHub user and displays it in the terminal.

### Features
  - Fetch the latest events for any GitHub user.
  - Display up to 5 recent activities, including event type, repository, and timestamp.
  - Handle errors gracefully (e.g., invalid usernames or API failures).

### Technologies Used
  - NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
  - Axios: For making HTTP requests to the GitHub API.
  - Commander: A library for building command-line interfaces.

### Installation

1. Clone the Repository

  git clone <repository-url>
  cd github-activity-cli

2. Install Dependencies
  npm install

3. Build the Application
  npm run build

### Usage

1. Run the CLI Use the following command to fetch the recent activity of a GitHub user:

node dist/main.js <username>

Replace <username> with the GitHub username of the user whose activity you want to check.

2. Example

node dist/main.js kamranahmedse

Output:
Fetching recent activity for user: kamranahmedse...

Recent Activity:
1. Type: PushEvent, Repo: kamranahmedse/developer-roadmap, Date: 2024-11-17T10:00:00Z
2. Type: IssueCommentEvent, Repo: kamranahmedse/design-patterns-for-humans, Date: 2024-11-16T15:00:00Z
3. Type: CreateEvent, Repo: kamranahmedse/git-cheatsheet, Date: 2024-11-15T20:30:00Z
4. Type: WatchEvent, Repo: kamranahmedse/nestjs-guide, Date: 2024-11-15T12:00:00Z
5. Type: ForkEvent, Repo: kamranahmedse/cli-tools, Date: 2024-11-14T18:00:00Z


3. Error Handling

- If the username does not exist:
Error: User not found. Please check the username and try again.

- For other errors:
Error: Failed to fetch data: <error message>


### Project Structure

src/
├── app.module.ts          # Main application module
├── github/
│   ├── github.service.ts  # Service to interact with GitHub API
main.ts                    # CLI entry point

### Customization
- Fetch More Events: Update slice(0, 5) in github.service.ts to fetch more than 5 events.
- Filter Events: Add custom filters for specific event types (e.g., PushEvent or ForkEvent).
- Add More Features: Expand to include user details or repository information.

### Known Issues
- GitHub's API rate limits unauthenticated requests. If you encounter rate-limiting issues, you can enhance the application to include authentication via a personal access token.

### License
- This project is licensed under the MIT License.

### Contributing
- Feel free to open issues or submit pull requests for enhancements or bug fixes.

### Author
- Created by Mikita Pilets


