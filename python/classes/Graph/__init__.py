from classes import Edge, Node
import pandas as pd


class Graph:

    def __init__(self, nodes=None, edges=None):
        self.nodes = nodes
        self.edges = edges
        if nodes is not None and edges is not None:
            self.normalize()

    def normalize(self):
        if self.nodes is not None and self.edges is not None:
            counter = 0
            for i in self.edges:
                counter += 1
                print(counter)
                i.n_from.incidentEdges.append(i)
                i.n_to.incedentEdges.append(i)

    def read_graph_from_csv(self, file_name_nodes, file_name_roads):
        self.nodes, self.edges = dict(), list()
        self.__read_nodes(pd.read_csv('maps/' + file_name_nodes))
        print('nodes done')
        self.__read_roads(pd.read_csv('maps/' + file_name_roads))
        print('edges done')
        # self.normalize()
        print('norm done')

    # Вспомогательные паблик методы
    def read_graph_as_matrix(self, filename):
        file = open(filename, 'r')
        self.nodes, self.edges = list(), list()
        f = False
        tag = "A"
        lines = file.readlines()
        for i in range(len(lines)):
            if lines[i] != '\n':
                if f:
                    # Создаем ребра
                    weights = [int(x) for x in lines[i].split(' ')]
                    for j in range(len(weights)):
                        if weights[j] != 0:
                            self.edges.append(Edge.Edge(self.nodes[i-1], self.nodes[j], weights[j]))
                else:
                    # Создаем нужное количество вершин
                    amount = int(lines[0])
                    # print(amount)
                    f = True
                    for w in range(amount):
                        self.nodes.append(Node.Node(tag))
                        tag = chr(ord(tag) + 1)
        self.normalize()
        pass

    def out_graph_as_matrix(self):
        for i in self.nodes:
            for j in self.nodes:
                print(self.__get_weight_btw_2_nodes(i, j), end=' ')
            print()
        pass

    def get_nodes(self):
        return self.nodes

    def get_edges(self):
        return self.edges

    # Вспомогательные приватные методы
    def _get_node_by_xy(self, x, y):
        for i in self.nodes:
            if i.x == x and i.y == y:
                return i
        return 0

    def _get_node_by_tag(self, tag):
        for i in self.nodes:
            if i.tag == tag:
                return i
        return 0

    def _get_node_by_id(self, id_):
        for i in self.nodes:
            if i.id == id_:
                return 1
        return 0

    def _get_all_edges_from(self, node_from):
        result = []
        for i in self.edges:
            if i.n_from == node_from:
                result.append(i)
        return result

    def __get_weight_btw_2_nodes(self, node1, node2):
        for i in self.edges:
            if i.n_from == node1 and i.n_to == node2:
                return i.get_weight()
        return 0

    def __read_nodes(self, nodes):
        for (ind, row) in nodes.iterrows():
            self.nodes[row.id] = Node.Node(id_=row.id, x=row.lat, y=row.lon)

    def __read_roads(self, roads):
        counter = 1
        for (ind, row) in roads.iterrows():
            if (counter % 100 == 0):
                print(counter)
            counter += 1
            self.edges.append(Edge.Edge(
                self.nodes[row.fromId],
                self.nodes[row.toId],
                row.weight
            ))
