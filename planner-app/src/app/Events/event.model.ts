export class Event {
    id: number;
    title: string;
    desription: string;
    dateStart: string;
    image_url: string;
    visible: boolean;

    constructor(id: number, title: string, description: string, dateStart: string, image_url: string) {
        this.id = id;
        this.title = title;
        this.desription = description;
        this.dateStart = dateStart;
        this.image_url = image_url;
    }
}