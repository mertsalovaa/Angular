export class Work {
    id: number;
    title: string;
    dateFinish: string;
    text_work: string;

    constructor(id: number, title: string, dateFinish: string, text_work: string) {
        this.id = id;
        this.title = title;
        this.dateFinish = dateFinish;
        this.text_work = text_work;
    }
}