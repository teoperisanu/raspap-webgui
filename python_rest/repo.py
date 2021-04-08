import json

class JsonRepo():
    def __init__(self, path):
        self.__path = path
        self.__data = None
        with open(path) as file:
            self.__data = json.load(file)

    def read_ch(self, ch_id):
        with open(self.__path) as file:
            self.__data = json.load(file)
            file.close()
        if self.__data is None:
            return None
        for ch in self.__data['channels']:
            if ch['id'] == ch_id:
                return ch
        return None

    def update_ch(self, channel):
        with open(self.__path) as file:
            self.__data = json.load(file)
            file.close()
        if self.__data is None:
            return None
        for ch in self.__data['channels']:
            if ch['id'] == channel.id:
                ch['enable'] = channel.enable
                ch['reference'] = channel.reference
                ch['frequency'] = channel.frequency
                ch['slip'] = channel.slip
                ch['digital_delay'] = channel.digital_delay
                ch['analog_delay'] = channel.analog_delay

        file = open(self.__path, 'w')
        json.dump(self.__data, file)
        file.close()
        return channel


