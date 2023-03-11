#include<iostream>
#include<string>
using namespace std;

int main() {
	int game[3][3] = {
		{0, 0, 0},
		{0, 0, 0},
		{0, 0, 0}
	};

	for (int i = 0; i < 3; i++) {
		for (int j = 0; j < 3; j++) {
			cout << game[i][j];
			if (j < 2) { cout << ", "; }
		}
		cout << endl;
	}
	string y;
	getline(cin, y);
}

void inti_game() {
	
}
void update_game(int game) {
	
	
}
bool connect3(int condition) {
	/*if () {

	}
	if () {

	}*/
}