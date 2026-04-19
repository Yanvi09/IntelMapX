from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def process_location_data(request):
    try:
        data = request.data

        # 🛑 ensure it's a list
        if not isinstance(data, list):
            return Response({"error": "Invalid data format"}, status=400)

        result = []

        for i in range(len(data)):
            point = data[i]

            # 🛑 safe access
            lat = point.get("lat")
            lon = point.get("lon")

            # valid point
            if lat is not None and lon is not None:
                result.append({
                    "lat": lat,
                    "lon": lon,
                    "type": "real"
                })
            else:
                # prediction logic
                if len(result) >= 2:
                    prev = result[-2]
                    curr = result[-1]

                    vx = curr["lat"] - prev["lat"]
                    vy = curr["lon"] - prev["lon"]

                    result.append({
                        "lat": curr["lat"] + vx,
                        "lon": curr["lon"] + vy,
                        "type": "predicted"
                    })
                else:
                    result.append({
                        "lat": 0,
                        "lon": 0,
                        "type": "broken"
                    })

        return Response(result)

    except Exception as e:
        print("ERROR:", e)  # 👈 show in terminal
        return Response({"error": "Server error"}, status=500)