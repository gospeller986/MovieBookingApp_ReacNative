import { SafeAreaView, StyleSheet, Text, View ,Pressable ,FlatList } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import malls from "../data/malls";
const MovieScreen = () => {
  const route = useRoute();
  console.log(route.params);
  const navigation = useNavigation();

  var date = new Date().getDate();
  if (date <= 9) {
    var x = date;
    date = "0" + x;
  }
  var month = new Date().getMonth() + 1;
  if (month <= 9) {
    var x = month;
    month = "0" + x;
  }
  var year = new Date().getFullYear();
  var dateString = year + "-" + month + "-" + date;
  var finaldate = String(dateString).trim();
  var endDay = 28;
  var endmonth = month;
  if (endDay > 15) {
    endmonth = new Date().getMonth() + 2;
    if (endmonth <= 9) {
      var x = endmonth;
      endmonth = "0" + x;
    }
  }
  var endYear = year;
  if (month == 12) {
    endYear = endYear + 1;
  }

  var endDateStr = endYear + "-" + endmonth + "-" + endDay;
  var finalEndDate = String(endDateStr).trim();

  const [selectedDate, setSelectedDate] = useState("");
  const [mall, setMall] = useState([]);
  const [seatsData, setSeatsData] = useState([]);
  const mallsData = malls;
  return (
    <SafeAreaView style={{ marginTop: 35 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 5 }}
            name="arrow-back"
            size={24}
            color="black"
          />
          <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 5 }}>
            {route.params.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Ionicons name="search" size={24} color="black" />
          <Ionicons
            style={{ marginHorizontal: 10 }}
            name="filter-outline"
            size={24}
            color="black"
          />
          <Ionicons name="share-outline" size={24} color="black" />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          marginTop: 10,
          marginLeft: 5,
        }}
      >
        <AntDesign name="Safety" size={24} color="green" />
        <Text style={{ paddingTop: 4, paddingLeft: 4 }}>
          Your safety is our priority
        </Text>
      </View>
      <HorizontalDatepicker
        mode="gregorian"
        startDate={new Date(finaldate)}
        endDate={new Date(finalEndDate)}
        initialSelectedDate={new Date(finaldate)}
        onSelectedDateChange={(date) => setSelectedDate(date)}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={38}
        itemRadius={10}
        selectedItemTextStyle={styles.selectedItemTextStyle}
        unselectedItemTextStyle={styles.selectedItemTextStyle}
        selectedItemBackgroundColor="#222831"
        unselectedItemBackgroundColor="#ececec"
        flatListContainerStyle={styles.flatListContainerStyle}
      /> 
      {mallsData.map((item, index) => (
        <Pressable
          onPress={() => {
            setMall(item.name);
            setSeatsData(item.tableData);
          }}
          style={{ margin: 10 }}
          key={index}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>{item.name}</Text>
          {mall.includes(item.name) ? (
            <FlatList
              numColumns={3}
              data={item.showtimes}
              renderItem={({ item }) => (
                <Pressable
                onPress={() => navigation.navigate("Theatre",{
                  mall:mall,
                  name:route.params.name,
                  timeSelected:item,
                  tableSeats:seatsData,
                  date:selectedDate,
                  image:route.params.image
                })}
                  style={{
                    borderColor: "green",
                    borderWidth: 0.5,
                    width: 80,
                    borderRadius: 3,
                    margin: 10,
                    padding: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "green",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />
          ) : null}
        </Pressable>
      ))}
    </SafeAreaView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({});
