import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { useAuth } from "../../context/authContext";
import {
  Channel,
  Chat,
  DefaultStreamChatGenerics,
  MessageInput,
  MessageList,
} from "stream-chat-expo";
import { Channel as ChannelType } from "stream-chat";

const ChatView = ({ channelId }) => {
  console.log("CHANNEL ID", channelId);
  const { user, streamToken } = useAuth();
  const [channel, setChannel] = useState(undefined);
  const [client, setClient] = useState(undefined);

  useEffect(() => {
    const connectToChannel = async () => {
      const chatClient = StreamChat.getInstance("3pkfpxv4cver");
      setClient(chatClient);
      const currentUser = { id: user.id.toString() };
      console.log("CURRENT USER", currentUser);
      console.log("STREAM TOKEN", streamToken);

      await chatClient.connectUser(currentUser, streamToken);
      const channel = chatClient.channel("messaging", channelId);

      setChannel(channel);
      await channel.watch();
    };

    connectToChannel();

    return () => {
      channel?.stopWatching();
    };
  }, []);

  console.log("CHANNEL", channel);
  return (
    <>
      {client && channel ? (
        <Chat client={client}>
          <Channel channel={channel}>
            <MessageList />
            <MessageInput />
          </Channel>
        </Chat>
      ) : (
        <View>
          <Text>Loading Chat...</Text>
          <Text>Loading Chat...</Text>
          <Text>Loading Chat...</Text>
          <Text>Loading Chat...</Text>
          <Text>Loading Chat...</Text>
          <Text>Loading Chat...</Text>
          <Text>Loading Chat...</Text>
          <Text>Loading Chat...</Text>
        </View>
      )}
    </>
  );
};

export default ChatView;
