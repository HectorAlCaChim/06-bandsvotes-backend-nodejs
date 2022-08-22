const Band = require('./band');
class BandList {
    constructor() {
        this.bands = [
            new Band('band 1'),
            new Band('band 2'),
        ]
    }

    addBand(name) {
        const newBand = new Band(name);
        this.bands.push(newBand);
        return this.bands;
    }
    removeBand(id) {
        this.bands = this.bands.filter(band => band.id != id);
    }

    getBands() {
        return this.bands;
    }
    increaseVotes(id) {
        this.bands = this.bands.map(band => {
            if (band.id == id) {
                band.votes += 1;
            }
            return band;
        })
    }
    changeBanName(id, name) {
        this.bands = this.bands.map(band => {
            if (band.id == id) {
                band.name = name;
            }
            return band;
        })
    }

}
module.exports = BandList;