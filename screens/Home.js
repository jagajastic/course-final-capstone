import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { hp } from '../utils/responsiveSizes';
import Header from '../components/Header';
import Food from '../components/Food';
import FoodCategory from '../components/FoodCategory';
import Button from '../components/Button';
import { API_URL } from '../api';
import debounce from 'lodash.debounce';
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from '../database';
import { getSectionListData, useUpdateEffect } from '../utils';

const sections = ["Appetizer", "Salads", "Beverages"];

const Home = () => {
  const [data, setData] = useState([]);
  const [categories,setCategories] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false),
  );

  const fetchData = async () => {
    // 1. Implement this function
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      // Transform the data to flatten out each menu item in the array
      const transformedData = data.menu.map(
        ({ id, title, price, category }) => ({
          id,
          uuid: 'c' + id.toString(),
          title,
          price,
          category: category.title,
        }),
      );

      return transformedData;
    } catch (error) {
      Alert.alert(error?.message)
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuItems = await getMenuItems();
        const sectionListData = getSectionListData(menuItems);
        setCategories(sectionListData.map(section => section.category))
        // The application only fetches the menu data once from a remote URL
        // and then stores it into a SQLite database.
        // After that, every application restart loads the menu from the database
        if (!menuItems.length) {
          const menuItems = await fetchData();
          saveMenuItems(menuItems);
        }
       
        setData(menuItems);
      } catch (e) {
        // Handle error
        Alert.alert(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        // If all filters are deselectedCategory, all categories are active
        if (filterSelections.every(item => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories,
        );
        setData(menuItems);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback(q => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = text => {
    setSearchBarText(text);
    debouncedLookup(text);
  };


  const handleFiltersChange = async index => {
    setSelectedCategory(index)
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  

  return (
    <SafeAreaWrapper>
      <Header handleSearchChange={handleSearchChange}/>
      <View style={styles.orderCategory}>
        <Text style={styles.orderCategoryText}>Order category</Text>
        <View style={styles.orderCategorySection}>
          {sections.map((category, index) => {
            const backgroundColor = index === selectedCategory ? '#f4ce15': '#CDCDCD'
            return (
              <TouchableOpacity onPress={() => handleFiltersChange(index)} key={category} >
                <FoodCategory name={category} backgroundColor={backgroundColor}/>
              </TouchableOpacity>
            )
          })}
        </View>
        <View style={{
          height: "100%"
        }}>
          <FlatList
            data={data}
            
            renderItem={({ item }) => (
              <Food
                title={item.title}
                description="Good food are for the soul anf Little Lemon offer the best of it all"
                price={`$${item.price}`}
              />
            )}
            ItemSeparatorComponent={() => <View  style={styles.separator}/> }
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  orderCategory: {
    padding: hp(2.5),
  },
  orderCategoryText: {
    fontSize: hp(3.3),
  },
  orderCategorySection: {
    flexDirection: 'row',
    paddingVertical: hp(1.5),
    marginBottom: hp(2.5),
  },
  separator: {
    width: '100%',
    height: hp(0.15),
    backgroundColor: '#ccc',
    marginVertical: hp(3)

  }
});
