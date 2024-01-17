import * as FileSystem from 'expo-file-system';

class PlaylistService {
    documentDirectory = FileSystem.documentDirectory;

    jsonName = 'music-folders.json';

    async getMusicFolders(): Promise<string[]> {
        const file = await this.readJsonDataFromDisk(this.jsonName);
        const musicFolders = file.exists ? file.content : [];
        return [...musicFolders];
    }

    async saveNewMusicDirectory(uri: string) {
        const file = await this.readJsonDataFromDisk(this.jsonName);

        if(!file.exists) {
            const data = [uri];
            await this.saveJsonDataToDisk(data, this.jsonName);

            return;
        }
        if(file.content.includes(uri)) { console.log("FOLDER ALREADY ADDED") ;return; }
        await this.deleteJsonDataFromDisk(this.jsonName);
        const data = [...file.content, uri];
        await this.saveJsonDataToDisk(data, this.jsonName);
    }

    async readJsonDataFromDisk(filePath: string) {
        try {
            const contentAsString = await FileSystem.readAsStringAsync(this.documentDirectory + filePath);
            const contentParsed = await JSON.parse(contentAsString);
            return {
                exists: true,
                content: contentParsed
            };
        } catch(e) {
            return {
                exists: false,
                content: {}
            };
        }
    }

    async saveJsonDataToDisk(jsonData: any, filePath: string) {
        // TODO: Implement save json file to device with expo file system module
        try {
            const fileAlreadyExists = (await FileSystem.getInfoAsync(this.documentDirectory + filePath)).exists;
            if (fileAlreadyExists) {
                console.log('File already exists');
                return;
            }
            const jsonString = JSON.stringify(jsonData);

            await FileSystem.writeAsStringAsync(this.documentDirectory + filePath, jsonString);
            console.log('Json file saved successfully');
        } catch(e) {
            console.log('Error saving file: ', e);
        }
    }

    async deleteJsonDataFromDisk(filePath: string) {
        try {
            await FileSystem.deleteAsync(this.documentDirectory + filePath);
        } catch(e) {
            console.error("Error deleting file: ", e);
        }
    }
}

export default new PlaylistService();