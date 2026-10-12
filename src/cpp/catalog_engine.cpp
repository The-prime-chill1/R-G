/**
 * R & G COLLECTIONS - HIGH-PERFORMANCE C++ CATALOG INDEXING & SEARCH ENGINE
 * Compiles with: g++ -O3 -std=c++17 catalog_engine.cpp -o catalog_engine
 */

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <sstream>
#include <iomanip>

struct Product {
    std::string id;
    std::string name;
    std::string category;
    double price;
    double originalPrice;
    bool inStock;
    std::vector<std::string> sizes;
    std::vector<std::string> swatches;
};

class CatalogEngine {
private:
    std::vector<Product> inventory;

public:
    void addProduct(const Product& p) {
        inventory.push_back(p);
    }

    std::vector<Product> searchByName(const std::string& query) {
        std::vector<Product> results;
        std::string lowerQuery = toLower(query);

        for (const auto& item : inventory) {
            if (toLower(item.name).find(lowerQuery) != std::string::npos ||
                toLower(item.category).find(lowerQuery) != std::string::npos) {
                results.push_back(item);
            }
        }
        return results;
    }

    std::vector<Product> filterByCategory(const std::string& cat) {
        if (cat == "all" || cat.empty()) return inventory;
        std::vector<Product> results;
        for (const auto& item : inventory) {
            if (item.category == cat) {
                results.push_back(item);
            }
        }
        return results;
    }

    void sortByPrice(std::vector<Product>& items, bool ascending = true) {
        std::sort(items.begin(), items.end(), [ascending](const Product& a, const Product& b) {
            return ascending ? (a.price < b.price) : (a.price > b.price);
        });
    }

    std::string toJSON() const {
        std::ostringstream ss;
        ss << "[\n";
        for (size_t i = 0; i < inventory.size(); ++i) {
            const auto& p = inventory[i];
            ss << "  {\n"
               << "    \"id\": \"" << p.id << "\",\n"
               << "    \"name\": \"" << p.name << "\",\n"
               << "    \"category\": \"" << p.category << "\",\n"
               << "    \"price\": " << std::fixed << std::setprecision(2) << p.price << ",\n"
               << "    \"inStock\": " << (p.inStock ? "true" : "false") << "\n"
               << "  }" << (i + 1 < inventory.size() ? "," : "") << "\n";
        }
        ss << "]\n";
        return ss.str();
    }

private:
    static std::string toLower(const std::string& str) {
        std::string res = str;
        std::transform(res.begin(), res.end(), res.begin(), ::tolower);
        return res;
    }
};

int main() {
    CatalogEngine engine;
    std::cout << "R & G Collections - C++ Catalog Engine Initialized Successfully." << std::endl;
    return 0;
}
