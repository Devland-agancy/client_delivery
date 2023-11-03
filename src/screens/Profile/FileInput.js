import React, { forwardRef, useState } from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

const FileInput = forwardRef((props, ref) => {
  const [selected, setSelected] = useState(null);

  const selectFile = async () => {
    try {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        allowsEditing: false,
        aspect: [4, 3],
      });
      if (!pickerResult.canceled) {
        let uri = `data:image/jpg;base64,${pickerResult.assets[0].base64}`;
        setSelected({
          uri,
        });
        props.onSelection(uri);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View className="w-full">
      <View
        {...props}
        className={`w-40 h-40 m-auto rounded-full border border-grey-2 overflow-hidden ${props.className}`}
        onTouchEnd={selectFile}
      >
        <Image
          source={selected || props.defaultImageSrc}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
    </View>
  );
});

export default FileInput;
