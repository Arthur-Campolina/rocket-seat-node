import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();
    await knex("meals").del();
    await knex("userMeals").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            "id": "5e6bea16-9525-452c-9cb3-99e233f27c26",
            "session_id": "c78f88e1-1d18-4871-94b9-9dc832438dbd",
            "name": "John Doe",
            "email": "johndoe@gmail.com",
            "type": "admin",
            "created_at": "2023-04-10 09:15:30",
            "updated_at": "2023-04-10 09:15:30"
        },
        {
            "id": "b78937f8-563d-42ef-9d2f-6d02c2c15f5e",
            "session_id": "da7520f7-8f16-43a0-9b23-3d3f1c215e20",
            "name": "Alice Johnson",
            "email": "alicejohnson@gmail.com",
            "type": "user",
            "created_at": "2023-04-10 09:15:30",
            "updated_at": "2023-04-10 09:15:30"
        },
        {
            "id": "80bc14f0-2e0d-41d2-9ca9-689f75c20e8d",
            "session_id": "4b4e3d20-3bde-4bc9-a3e7-447c8bc03d4f",
            "name": "Bob Smith",
            "email": "bobsmith@gmail.com",
            "type": "user",
            "created_at": "2023-04-10 09:15:30",
            "updated_at": "2023-04-10 09:15:30"
        },
        {
            "id": "2c2b9a9b-48a6-48b6-9d6e-eb8aa1e1d7e7",
            "session_id": "7e63f1dc-2ca8-4d16-8e26-63e4455f7f9d",
            "name": "Sarah Thompson",
            "email": "sarahthompson@gmail.com",
            "type": "user",
            "created_at": "2023-04-10 09:15:30",
            "updated_at": "2023-04-10 09:15:30"
        },
        {
            "id": "d678b09a-4682-4e59-bb74-24495e72cd06",
            "session_id": "ec3e02f0-9971-437d-bb31-c2ca762ef98a",
            "name": "Michael Brown",
            "email": "michaelbrown@gmail.com",
            "type": "user",
            "created_at": "2023-04-10 09:15:30",
            "updated_at": "2023-04-10 09:15:30"
        },
        {
            "id": "d678b09a-4682-4e59-bb74-24495e72cd07",
            "session_id": "ec3e02f0-9971-437d-bb31-c2ca762ef98a",
            "name": "Michael Brown",
            "email": "michaelbrown@gmail.com",
            "type": "user",
            "created_at": "2023-04-10 09:15:30",
            "updated_at": "2023-04-10 09:15:30"
        },
    ]);

    await knex("meals").insert([
        {
            "id": "4a4fd8f7-6a88-4155-8be5-06e35f2d5181",
            "name": "Breakfast",
            "description": "Scrambled eggs with vegetables",
            "date": "2023-04-11T08:00:00Z",
            "mealEaten": true,
            "caloriesQuantity": 350,
            "carbsQuantity": 25,
            "proteinQuantity": 20,
            "fatQuantity": 15,
            "trafficLight": "green",
            "created_at": "2023-04-10 09:15:30",
            "updated_at": "2023-04-10 09:15:30"
        },
        {
            "id": "51be17d3-4800-4a3a-af68-11a7a0f81672",
            "name": "Lunch",
            "description": "Grilled chicken with mixed vegetables",
            "date": "",
            "mealEaten": false,
            "caloriesQuantity": 450,
            "carbsQuantity": 30,
            "proteinQuantity": 40,
            "fatQuantity": 10,
            "trafficLight": "orange",
            "created_at": "2023-04-10 09:15:30",
            "updated_at": "2023-04-10 09:15:30"
        },
        {
            "id": "a54fbb14-5ff5-45c7-b8e1-953c7d51b895",
            "name": "Dinner",
            "description": "Salmon with roasted vegetables",
            "date": "2023-04-11T18:00:00Z",
            "mealEaten": true,
            "caloriesQuantity": 500,
            "carbsQuantity": 35,
            "proteinQuantity": 30,
            "fatQuantity": 15,
            "trafficLight": "red",
            "created_at": "2023-04-10 09:15:30",
            "updated_at": "2023-04-10 09:15:30"
        },
        {
            "id": "f2491250-9897-41a8-a5d7-9920b74e65f8",
            "name": "Snack",
            "description": "Apple with almond butter",
            "date": "2023-04-11T15:30:00Z",
            "mealEaten": true,
            "caloriesQuantity": 200,
            "carbsQuantity": 20,
            "proteinQuantity": 5,
            "fatQuantity": 10,
            "trafficLight": "green",
            "created_at": "2023-04-10 09:15:30",
            "updated_at": "2023-04-10 09:15:30"
        },
        {
            "id": "ce3d6077-8a46-42eb-91d4-7a2f67c1bb7b",
            "name": "Brunch",
            "description": "Avocado toast with poached eggs",
            "date": "",
            "mealEaten": false,
            "caloriesQuantity": 400,
            "carbsQuantity": 30,
            "proteinQuantity": 15,
            "fatQuantity": 20,
            "trafficLight": "orange",
            "created_at": "2023-04-10 09:15:30",
            "updated_at": "2023-04-10 09:15:30"
        },
        {
            "id": "f8a155b4-7fb2-4752-9234-4e55a771bf54",
            "name": "Dessert",
            "description": "Chocolate cake with vanilla ice cream",
            "date": "2023-04-11T20:30:00Z",
            "mealEaten": true,
            "caloriesQuantity": 600,
            "carbsQuantity": 50,
            "proteinQuantity": 8,
            "fatQuantity": 40,
            "trafficLight": "red",
            "created_at": "2023-04-10 09:15:30",
            "updated_at": "2023-04-10 09:15:30"
        }
    ])

    await knex("userMeals").insert([
        {
            "id": "b98cd6b0-6ca2-4d9d-9d42-f92699036798",
            "mealId": "f8a155b4-7fb2-4752-9234-4e55a771bf54",
            "userId": "5e6bea16-9525-452c-9cb3-99e233f27c26",
            "created_at": "2023-04-10 09:15:30Z"
        },
        {
            "id": "32a227cd-1d9b-4d93-b788-93be93e3566d",
            "mealId": "ce3d6077-8a46-42eb-91d4-7a2f67c1bb7b",
            "userId": "5e6bea16-9525-452c-9cb3-99e233f27c26",
            "created_at": "2023-04-10 09:15:30Z"
        },
        {
            "id": "981f6010-2307-4bc8-b3cd-c2f3c9e9d800",
            "mealId": "a54fbb14-5ff5-45c7-b8e1-953c7d51b895",
            "userId": "5e6bea16-9525-452c-9cb3-99e233f27c26",
            "created_at": "2023-04-10 09:15:30Z"
        },
        {
            "id": "c5e5dc5c-19be-4e82-ae34-22667e8db6c7",
            "mealId": "f2491250-9897-41a8-a5d7-9920b74e65f8",
            "userId": "5e6bea16-9525-452c-9cb3-99e233f27c26",
            "created_at": "2023-04-11T16:00:00Z"
        },
        {
            "id": "24d216fd-6e89-4b21-a99b-9d73c2b71cc2",
            "mealId": "f2491250-9897-41a8-a5d7-9920b74e65f8",
            "userId": "5e6bea16-9525-452c-9cb3-99e233f27c26",
            "created_at": "2023-04-11T21:15:00Z"
        },
        {
            "id": "a43c3c22-8d57-4316-92ef-cff2ebe12d4c",
            "mealId": "6c1ad6e4-8d0f-4a56-8851-0e77f8b10d9b",
            "userId": "b78937f8-563d-42ef-9d2f-6d02c2c15f5e",
            "created_at": "2023-04-11T19:45:00Z"
        },
        {
            "id": "b16d92b1-71cb-4be0-9655-032e5e0d0e30",
            "mealId": "f8a155b4-7fb2-4752-9234-4e55a771bf54",
            "userId": "b78937f8-563d-42ef-9d2f-6d02c2c15f5e",
            "created_at": "2023-04-11T20:45:00Z"
        }
    ])
};
