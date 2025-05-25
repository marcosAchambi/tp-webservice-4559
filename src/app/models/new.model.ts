export class New {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  publishedAt: string;

  constructor(
    id: number,
    title: string,
    description: string,
    imageUrl: string,
    publishedAt: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.publishedAt = publishedAt;
  }
}
