const TRUCK_STATUS = {
    IN_SERVICE: 'IN_SERVICE',
    ON_LOAD: 'ON_LOAD',
};

const TRUCK_TYPES = {
    SPRINTER: 'SPRINTER',
    SMALL_STRAIGHT: 'SMALL_STRAIGHT',
    LARGE_STRAIGHT: 'LARGE_STRAIGHT',
};

const LOAD_STATUS = {
    NEW: 'NEW',
    POSTED: 'POSTED',
    ASSIGNED: 'ASSIGNED',
    SHIPPED: 'SHIPPED',
};

const LOAD_STATE = {
    ON_ROUTE_TO_PICK_UP: 'ON_ROUTE_TO_PICK_UP',
    ARRIVED_TO_PICK_UP: 'ARRIVED_TO_PICK_UP',
    ON_ROUTE_TO_DELIVERY: 'ON_ROUTE_TO_DELIVERY',
    ARRIVED_TO_DELIVERY: 'ARRIVED_TO_DELIVERY',
};

module.exports = {
    TRUCK_STATUS,
    TRUCK_TYPES,
    LOAD_STATUS,
    LOAD_STATE,
};
