number_of_tiles = 12
number_of_tiles_per_row = 6
number_of_tiles_per_column = 3


def generate_board_string():
    for i in range(1, number_of_tiles + 1):
        print(f"tile_map[{i}] = [")
        for row in range(number_of_tiles_per_column):
            for col in range(number_of_tiles_per_row):
                print(f"    new Tile({i}, {row}, {col}, )", end="")
                if (col == number_of_tiles_per_row - 1 and row == number_of_tiles_per_column - 1):
                    print("")
                else:
                    print(",")
            print()
        print("];\n")

generate_board_string()