import { Project } from "./projects";

const GITHUB_USERNAME = "kandibobe";

export async function getGithubProjects(): Promise<Project[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) return [];

    const repos = await response.json();

    return repos
      .filter((repo: any) => !repo.fork && repo.name !== GITHUB_USERNAME) // Filter out forks and profile repo
      .map((repo: any) => ({
        id: repo.id,
        slug: repo.name,
        title: repo.name.split("-").map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
        description: repo.description || "No description provided.",
        category: repo.language || "Open Source",
        // Using a reliable image placeholder or trying to find a social preview
        src: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`,
        technologies: repo.topics && repo.topics.length > 0 
          ? repo.topics 
          : [repo.language].filter(Boolean),
        date: new Date(repo.created_at).getFullYear().toString(),
        githubUrl: repo.html_url,
        liveUrl: repo.homepage || undefined,
        stats: {
          stars: repo.stargazers_count,
          forks: repo.forks_count,
        },
      }));
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    return [];
  }
}

// Keep old function for compatibility if needed, but update it to use the same logic
export async function getGithubStats(username: string) {
  const projects = await getGithubProjects();
  return projects.map(p => ({
    name: p.slug,
    stars: p.stats?.stars,
    forks: p.stats?.forks,
    url: p.githubUrl,
    description: p.description,
    language: p.category,
  }));
}
