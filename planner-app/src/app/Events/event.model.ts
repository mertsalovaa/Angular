export class Event {
    title: string;
    desription: string;
    dateStart: string;
    image_url: string;

    constructor(title: string, description: string, dateStart: string, image_url: string) {
        this.title = title;
        this.desription = description;
        this.dateStart = dateStart;
        this.image_url = image_url;
    }
}