const storeService = {
    save: (key: string, value: any) => {
        let s = JSON.stringify(value);
        localStorage.setItem(key, s);
    },
    get: (key: string) => {
        let s = localStorage.getItem(key);
        if (!s) return null;
        
        try {
            return JSON.parse(s);
        } catch (err) {
            return s;
        }
    },
    clear: () => {
        localStorage.clear();
    }
}

export default storeService;