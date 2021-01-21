
export default new class restApiFaker {

    fetchFakerUsers() {
        const fake = Math.random();
        let users = [];
        for (let i = 0;  i < (Math.floor(Math.random() * 31)+4) + 1; i++  ) {
            users.push(this.generateUser());
        }

        return users;
    }

    generateUser() {
        return {
            'username': Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2),
            'loginTime': '00:00:00',
            'lastUpdate': '00:00:00',
            'IP': '00.00.00.00'
        }
    }

}