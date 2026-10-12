/**
 * R & G COLLECTIONS - NATIVE C++ ORDER & RECEIPT PROCESSING ENGINE
 * Compiles with: g++ -O3 -std=c++17 order_processor.cpp -o order_processor
 */

#include <iostream>
#include <vector>
#include <string>
#include <iomanip>
#include <sstream>

struct OrderItem {
    std::string productName;
    std::string size;
    int quantity;
    double unitPrice;
};

class OrderProcessor {
public:
    static double calculateSubtotal(const std::vector<OrderItem>& items) {
        double subtotal = 0.0;
        for (const auto& item : items) {
            subtotal += item.unitPrice * item.quantity;
        }
        return subtotal;
    }

    static double applyDiscount(double subtotal, const std::string& promoCode) {
        if (promoCode == "RG30" || promoCode == "OPENING30") {
            return subtotal * 0.30; // 30% Off
        }
        return 0.0;
    }

    static std::string generateReceipt(
        const std::string& customerName,
        const std::string& location,
        const std::vector<OrderItem>& items,
        const std::string& promoCode = ""
    ) {
        double subtotal = calculateSubtotal(items);
        double discount = applyDiscount(subtotal, promoCode);
        double total = subtotal - discount;

        std::ostringstream ss;
        ss << "==========================================\n";
        ss << "         R & G COLLECTIONS - INVOICE      \n";
        ss << "==========================================\n";
        ss << "Customer: " << (customerName.empty() ? "Guest Client" : customerName) << "\n";
        ss << "Hub / Location: " << location << "\n";
        ss << "------------------------------------------\n";
        ss << "ITEMS ORDERED:\n";

        for (size_t i = 0; i < items.size(); ++i) {
            ss << (i + 1) << ". " << items[i].productName
               << " [" << items[i].size << "] x" << items[i].quantity
               << " - NGN " << std::fixed << std::setprecision(2) << (items[i].unitPrice * items[i].quantity) << "\n";
        }

        ss << "------------------------------------------\n";
        ss << "Subtotal: NGN " << subtotal << "\n";
        if (discount > 0) {
            ss << "Promo Discount (" << promoCode << "): -NGN " << discount << "\n";
        }
        ss << "TOTAL PAYABLE: NGN " << total << "\n";
        ss << "==========================================\n";
        ss << "Contact: 09045231629 | 07060610938\n";
        ss << "Email: rasakanu2008@gmail.com\n";
        ss << "TikTok: @R&G COLLECTION\n";
        return ss.str();
    }
};

int main() {
    std::cout << "R & G Collections - C++ Order Processor Engine Initialized." << std::endl;
    return 0;
}
