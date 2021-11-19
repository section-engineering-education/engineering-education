import os

from flask import Flask, redirect, url_for, request, flash, json, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from shapely import wkb
from werkzeug.utils import secure_filename
from geoalchemy2 import Geometry
from geoalchemy2.shape import to_shape
from flask_restful import Api, Resource
  

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Thisissecret!'
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:password@localhost/geodata'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
api = Api(app)

db = SQLAlchemy(app)

class AoiCoordinate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    aoi = db.Column(db.String(50), nullable=False)
    coordinate = db.Column(Geometry('POLYGON'))


class Coordinate(Resource):
    def post(self):
        response = {
            "status": 400,
            "message": "Coordinate not saved"
        }
        aoi = request.form.get('aoi')
        file = request.files['coordinate']
        read_file = file.read()
        file_json = json.loads(read_file)
        aoi_coordinate = file_json["features"][0]['geometry']
        coordinate = AoiCoordinate(aoi=aoi, coordinate=json.dumps(aoi_coordinate))
        db.session.add(coordinate)
        db.session.commit()

        response['status'] = 200
        response['message'] = "Coordinate saved successfully"

        return response, 200

class Coordinates(Resource):
    def get(self):
        response = {
            "status": 204,
            "message": "No coordinate available"
        }

        coordinates = AoiCoordinate.query.all()

        if coordinates:

            all_cord = []
            for location in coordinates:

                location_details = {
                    'id': location.id,
                    'location_coordinate': str(to_shape(location.coordinate)),
                    'location_aoi': location.aoi
                }
                all_cord.append(location_details)
            response['status'] = 200
            response['message'] = all_cord
            return response, 200
        return response, 204

class CoordinateId(Resource):
    def get(self, coordinate_id):
        response = {
            "status": 204,
            "message": "Coordinate not available"
        }
        aoi_details = AoiCoordinate.query.filter_by(id=coordinate_id).first()
        if aoi_details:

            details = {
                "id": aoi_details.id,
                "location_coordinate": str(to_shape(aoi_details.coordinate)),
                "location_aoi": aoi_details.aoi
            }
            response['status'] = 200
            response['message'] = details
            return response, 200
        return response, 204

    def put(self, coordinate_id):
        response = {
            "status": 204,
            "message": "AOI is not available"
        }
        aoi_details = AoiCoordinate.query.filter_by(id=coordinate_id).first()
        if aoi_details:
            file = request.files['coordinate']
            aoi = request.form.get('aoi')
            read_file = file.read()
            file_json = json.loads(read_file)
            aoi_coordinate = file_json["features"][0]['geometry']

            aoi_details.coordinate = aoi_coordinate
            aoi_details.aoi = aoi
            db.session.commit()

            response['status'] = 200
            response['message'] = "aoi updated successfully"
            return response, 200
        return response, 204

    def delete(self, coordinate_id):
        response = {
            "status": 204,
            "message": "AOI is not available"
        }
        aoi = AoiCoordinate.query.filter_by(id=coordinate_id)
        if aoi:
            db.session.delete(aoi)
            db.session.commit()
            response['status'] = 200
            response['message'] = 'Aoi deleted successfully'
            return response, 200

api.add_resource(Coordinate, "/api/coordinate")
api.add_resource(Coordinates, "/api/coordinates")
api.add_resource(CoordinateId, '/api/coordinate/<int:coordinate_id>')

if __name__ == "__main__":
    app.run(host="127.0.0.1", port="5000", debug=True)
