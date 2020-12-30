/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {

  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';


const WorldStatistics = ({ navigation }) => {
  const covidoptions = {
    method: 'GET',
    url: 'https://covid-19-data.p.rapidapi.com/totals',
    headers: {
      'x-rapidapi-key': '129576d7f4msh3f30654c2dd4d26p1d60f9jsncf4ee3a76841',
      'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
    }
  };

  const worldoptions = {
    method: 'GET',
    url: 'https://world-population.p.rapidapi.com/worldpopulation',
    headers: {
      'x-rapidapi-key': '129576d7f4msh3f30654c2dd4d26p1d60f9jsncf4ee3a76841',
      'x-rapidapi-host': 'world-population.p.rapidapi.com'
    }
  };

  axios.request(covidoptions).then(function (response1) {
    axios.request(worldoptions).then(function (response2) {
      setData({ ...response1.data[0], population: response2.data.body.world_population });
    }).catch(function (error) {
      console.error(error);
    });

  }).catch(function (error) {
    console.error(error);
  });

  const [data, setData] = useState(false);

  return (<View>
    <View style={styles.header}>
      <Text style={styles.text}>World Statistics</Text>

    </View>

    <View style={styles.listdisplay}>
      <Text>Confirmed Cases</Text>
      <Text>{data ? data.confirmed : 'Fetching...'} </Text>
      <Text>{data ? ((data.confirmed / data.population) * 100).toFixed(2) : ''}%</Text>
    </View>
    <View style={styles.listdisplay}>
      <Text>Recovered Cases</Text>
      <Text>{data ? data.recovered : 'Fetching...'} </Text>
      <Text>{data ? ((data.recovered / data.confirmed) * 100).toFixed(2) : ''}%</Text>
    </View>
    <View style={styles.listdisplay}>
      <Text>Critical Cases</Text>
      <Text>{data ? data.critical : 'Fetching...'}</Text>
      <Text>{data ? ((data.critical / data.confirmed) * 100).toFixed(2) : ''}%</Text>
    </View>
    <View style={styles.listdisplay}>
      <Text>Deaths</Text>
      <Text>           {data ? data.deaths : 'Fetching...'}</Text>
      <Text>{data ? ((data.deaths / data.confirmed) * 100).toFixed(2) : ''}%</Text>
    </View>
    <View style={styles.listdisplay}>
      <Text>Last Updated </Text>
      <Text>{data ? data.lastUpdate : 'Fetching...'}</Text>
    </View>
  </View>
  );
}

const CountryList = ({ navigation }) => {
  const options = {
    method: 'GET',
    url: 'https://world-population.p.rapidapi.com/allcountriesname',
    headers: {
      'x-rapidapi-key': '129576d7f4msh3f30654c2dd4d26p1d60f9jsncf4ee3a76841',
      'x-rapidapi-host': 'world-population.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
    setData(response.data.body.countries);
  }).catch(function (error) {
    console.error(error);
  });

  const [data, setData] = useState(false);

  return <View>
    <View style={styles.header}>
      <Text style={styles.text}>Country List</Text>
    </View>
    {!data && (<Text>Fetching</Text>)}
    {data && (
      <FlatList data={data} renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => navigation.navigate("Country Statistics", { name: item })} >
            <View style={styles.listdisplay}>
              <Text>{item}</Text>
            </View>
          </TouchableOpacity>
        )
      }}></FlatList>
    )}
  </View>
}

const CountryStatistics = ({ navigation, route }) => {
  const [data, setData] = useState(false);
  const [favcountry, setfavcountry]=useState([]);
  const countryoptions = {
    method: 'GET',
    url: 'https://covid-19-data.p.rapidapi.com/country',
    params: { name: route.params.name },
    headers: {
      'x-rapidapi-key': '129576d7f4msh3f30654c2dd4d26p1d60f9jsncf4ee3a76841',
      'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
    }
  };
  const storeData = (value) => {
    try {
      setfavcountry([value,...favcountry]);
       AsyncStorage.setItem('favs', JSON.stringify(favcountry));
       console.log('success');
       
    } catch (e) {
      console.log(e)
    }
  }
  
  
  

  const worldoptions = {
    method: 'GET',
    url: 'https://world-population.p.rapidapi.com/worldpopulation',
    headers: {
      'x-rapidapi-key': '129576d7f4msh3f30654c2dd4d26p1d60f9jsncf4ee3a76841',
      'x-rapidapi-host': 'world-population.p.rapidapi.com'
    }
  };

  axios.request(countryoptions).then(function (response1) {
    axios.request(worldoptions).then(function (response2) {
      setData({ ...response1.data[0], population: response2.data.body.world_population });
    }).catch(function (error) {
      console.error(error);
    });

  }).catch(function (error) {
    console.error(error);
  });

 
  
  return (<View>
    <View style={styles.header}>
      <Text style={styles.text}>{route.params.name} Statistics</Text>

    </View>
    <View style={styles.listdisplay}>
      <Text>Confirmed Cases</Text>
      <Text>{data ? data.confirmed : 'Fetching...'} </Text>
      <Text>{data ? ((data.confirmed / data.population) * 100).toFixed(2) : ''}%</Text>
    </View>
    <View style={styles.listdisplay}>
      <Text>Recovered Cases</Text>
      <Text>{data ? data.recovered : 'Fetching...'} </Text>
      <Text>{data ? ((data.recovered / data.confirmed) * 100).toFixed(2) : ''}%</Text>
    </View>
    <View style={styles.listdisplay}>
      <Text>Critical Cases</Text>
      <Text>{data ? data.critical : 'Fetching...'}</Text>
      <Text>{data ? ((data.critical / data.confirmed) * 100).toFixed(2) : ''}%</Text>
    </View>
    <View style={styles.listdisplay}>
      <Text>Deaths</Text>
      <Text>           {data ? data.deaths : 'Fetching...'}</Text>
      <Text>{data ? ((data.deaths / data.confirmed) * 100).toFixed(2) : ''}%</Text>
    </View>
    <View style={styles.listdisplay}>
      <Text>Last Updated </Text>
      <Text>{data ? data.lastUpdate : 'Fetching...'}</Text>
    </View>
    <Button title="Favorite" onPress={()=>storeData(route.params.name)}></Button>
  
   
  </View>);
}


const FavoriteCountries = ({ navigation }) => {
  useEffect(()=>{
      getArra()
  })
  const getArra=async()=>{
    try{
      const jsonValue = await AsyncStorage.getItem('favs')
      if(jsonValue!==null)
      {
        setFav(jsonValue,...fav); 
        console.log(fav)
        
      }
    }
    catch(e)
    {
      console.log(e)
    }
  }
  const[fav,setFav]=useState([]);
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.text}>Favorite</Text>
      
        <FlatList data={fav}
         renderItem={({ item })=>{
          return(
            <TouchableOpacity onPress={() => navigation.navigate("Country Statistics", { name: item })} >
            <View style={styles.listdisplay}>
              <Text>{item}</Text>
            </View>
          </TouchableOpacity>
          )

        }} ></FlatList>
        

      </View>
    </View>
  );
}
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="World Statistics">
        <Drawer.Screen name="World Statistics" component={WorldStatistics} />
        <Drawer.Screen name="Country List" component={CountryList} />
        <Drawer.Screen name="Country Statistics" component={CountryStatistics} />
        <Drawer.Screen name="Favorite Countries" component={FavoriteCountries} />
      </Drawer.Navigator>
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  listdisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomWidth: 1
  },
  header: {
    height: 60,
    padding: 15,
    backgroundColor: 'darkslateblue'

  },
  text: {
    color: 'white',
    fontSize: 23,
    textAlign: 'center'
  }

})

export default App;
