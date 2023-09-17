import {Container} from '@/models/container';

/**
 */
export class ContainerService {
  public static singleton = new ContainerService();

  private hasLoaded: boolean = false;
  private containers: Container[] = [];

  /**
   * Initializes containers
   */
  constructor() {
    this.refresh();
  }

  /**
   * @return {Container[] | null}
   */
  public getContainers(): Container[] | null {
    return this.hasLoaded ? [...this.containers] : null;
  }

  /**
   * @param {Partial<Container>} partialContainer
   * @return {Promise<Container | null>}
   */
  public async createContainer(
      partialContainer: Partial<Container>
  ): Promise<Container | null> {
    try {
      const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/imports/container`,
          {
            method: 'POST',
            body: JSON.stringify(partialContainer),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          }
      );
      const container = await res.json() as Container;
      this.containers.push(container);
      return container;
    } catch {
      return null;
    }
  }

  /**
   * @return {Container[] | null}
   */
  public async refresh(): Promise<Container[] | null> {
    try {
      const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/imports/container`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          }
      );
      const containers = await res.json() as Container[];
      this.containers = containers;
      this.hasLoaded = true;
      return containers;
    } catch {
      return null;
    }
  }
}
