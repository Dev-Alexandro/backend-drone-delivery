import axios from 'axios';
import dijkstrajs from 'dijkstrajs';


let graph = {};

async function calcDelivery(req, res) {


    try {

        const { start_point, pickup_point, deliver_poind } = req.params;
        const response = await axios.get('https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f');
        graph = response.data;
        const path1 = dijkstrajs.find_path(graph, start_point, pickup_point);
        const cost1 = moveCostSeconds(graph, path1);
        const path2 = dijkstrajs.find_path(graph, pickup_point, deliver_poind);
        const cost2 = moveCostSeconds(graph, path2);
        const totalCost = cost1 + cost2;
        const totalPath = path1.concat(path2.slice(1));
        return res.status(200).json({ 'path1': path1, 'cost1': cost1, 'path2': path2, 'cost2': cost2, 'totalPath': totalPath, 'totalCost': totalCost });

    } catch (error) {

        return res.status(500).json({ 'error': error });

    }

}


function moveCostSeconds(graph, path) {

    try {

        let cost = 0;

        for (let i = 0; i < path.length - 1; i++) {
            const node1 = path[i];
            const node2 = path[i + 1];
            cost += graph[node1][node2];

        }

        return cost;
    } catch (error) {

        console.error(error);

    }
}

export { calcDelivery, moveCostSeconds };