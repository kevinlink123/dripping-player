import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootBottomTabsNavigatorType } from "./types";
import AudioList from "../../screens/AudioList";
import Player from "../../screens/Player";
import Playlist from "../../screens/Playlist";

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/Header";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";
import Options from "../../screens/Options";

const BottomTabs = createBottomTabNavigator<RootBottomTabsNavigatorType>();

export default function AppNavigator() {
    return (
        <BottomTabs.Navigator
            screenOptions={{
                header: ({ navigation, route, options }) => {
                    return (
                        <Header
                            title={route.name}
                            backgroundColor={colors.header}
                        />
                    );
                },
                tabBarActiveTintColor: colors.albumIcon,
                tabBarInactiveTintColor: colors.offWhite,
                tabBarStyle: {
                    backgroundColor: colors.tabBarBackground,
                    height: sizes.TAB_BAR_HEIGHT,
                    paddingBottom: 3,
                },
            }}
        >
            <BottomTabs.Screen
                name="Device's Music"
                component={AudioList}
                options={{
                    tabBarIcon: ({ size, color }) => {
                        return (
                            <Ionicons
                                name="headset-sharp"
                                size={size}
                                color={color}
                            />
                        );
                    },
                }}
            />
            <BottomTabs.Screen
                name="Player"
                component={Player}
                options={{
                    tabBarIcon: ({ size, color }) => {
                        return (
                            <MaterialCommunityIcons
                                name="record-player"
                                size={size}
                                color={color}
                            />
                        );
                    },
                }}
            />
            <BottomTabs.Screen
                name="Playlist"
                component={Playlist}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons
                            name="playlist-music"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="Options"
                component={Options}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons
                            name="options-sharp"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </BottomTabs.Navigator>
    );
}
