def predict_location(prev, curr):
    vx = curr['lat'] - prev['lat']
    vy = curr['lon'] - prev['lon']

    return {
        "lat": curr['lat'] + vx,
        "lon": curr['lon'] + vy,
        "type": "predicted"
    }


def process_data(data):
    result = []

    for i in range(len(data)):
        point = data[i]

        # If valid
        if point.get("lat") is not None and point.get("lon") is not None:
            result.append({
                "lat": point["lat"],
                "lon": point["lon"],
                "type": "real"
            })

        else:
            if len(result) >= 2:
                prev = result[-2]
                curr = result[-1]

                vx = curr['lat'] - prev['lat']
                vy = curr['lon'] - prev['lon']

                predicted = {
                    "lat": curr['lat'] + vx,
                    "lon": curr['lon'] + vy,
                    "type": "predicted"
                }

                result.append(predicted)
            else:
                result.append({
                    "lat": 0,
                    "lon": 0,
                    "type": "broken"
                })

    return result