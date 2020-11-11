export class RegisterEmployeeModel {
    public id:string = "";
    public email: string = "";
    public password: string = "";
    public phone: string = "";
    public fullName: string = "";
    public address: string = "";
    public specialities: string = "";
    public image: string = "";
    public birthDate = new Date();

    isValid(): boolean {
        if (
            this.id != "" ||
            this.address != "" ||
            this.birthDate != new Date() ||
            this.email != "" ||
            this.fullName != "" ||
            this.password != "" ||
            this.phone != "" ||
            this.specialities != "") {
            return true;
        }
        else {
            return false;
        }
    }

    isEmail(): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.email).toLowerCase());
    }
}