from flask import Flask, jsonify
import pyodbc
import json
from datetime import date
from flask_cors import CORS

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, date):
            return obj.isoformat()
        return super().default(obj)

app = Flask(__name__)
app.json_encoder = CustomJSONEncoder

# Enable CORS
CORS(app)

# Database Connection

def connect_to_database():
    try:
        conn_str = (
            "DRIVER={ODBC Driver 17 for SQL Server};"
            "SERVER={192.168.0.101};"
            "DATABASE={RentalBeast};"
            "UID={sa};"
            "PWD={Admin@123};"
            "Login Timeout=3000;"
        )
        db_conn = pyodbc.connect(conn_str, autocommit=True)
        db_cursor = db_conn.cursor()

        return db_conn, db_cursor

    except pyodbc.Error as e:
        print({'error': 'An error occurred. Please try again later.'} + str(e))
        return None, None
    
# Parsing Error Count API

@app.route('/parsing_error', methods=['GET'])
def get_parsing_error():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute("SELECT COUNT(*) AS count FROM (SELECT url, exceptions, run_id FROM rb.db_rb_exceptions WHERE (exceptions LIKE '%Message:%' OR exceptions LIKE '%Expecting value:%'or exceptions like '%Scrapper%') AND run_id = (SELECT MAX(run_id) FROM rb.db_rb_exceptions) UNION ALL SELECT url, exceptions, run_id FROM rb.db_rb_exceptions WHERE (CONVERT(varchar(max), exceptions) in ('list index out of range')) AND run_id = (SELECT MAX(run_id) FROM rb.db_rb_exceptions)) as subquery;")
        count = cursor.fetchone()[0]
        
        cursor.close()
        db_conn.close()

        return jsonify({'parsing_error': count})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500

# Parsing Error Table API

@app.route('/parsing_error_table')
def get_parsing_error_table():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute("SELECT url, exceptions, run_id FROM rb.db_rb_exceptions WHERE (exceptions LIKE '%Message:%' OR exceptions LIKE '%Expecting value:%'or exceptions like '%Scrapper%') AND run_id = (SELECT MAX(run_id) FROM rb.db_rb_exceptions) UNION ALL SELECT url, exceptions, run_id FROM rb.db_rb_exceptions WHERE (CONVERT(varchar(max), exceptions) in ('list index out of range')) AND run_id = (SELECT MAX(run_id) FROM rb.db_rb_exceptions);")
        rows = cursor.fetchall()
    
        columns = [desc[0] for desc in cursor.description]
        parsing_error_table = []
        for row in rows:
            converted_row = []
            for item in row:
                if isinstance(item, date):
                    item = item.isoformat()
                converted_row.append(item)
            parsing_error_table.append(dict(zip(columns, converted_row)))
        
        cursor.close()
        db_conn.close()

        return jsonify({'data': parsing_error_table})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500
    
#  No Data Found API

@app.route('/no_data_found', methods=['GET'])
def get_no_data_found():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute("SELECT COUNT(*) AS count FROM rb.db_rb_exceptions WHERE (CONVERT(varchar(max), exceptions) = 'No data found for the given URL' OR CONVERT(varchar(max), exceptions) = 'No units found') AND run_id = (SELECT MAX(run_id) FROM rb.db_rb_exceptions);")
        count = cursor.fetchone()[0]
        
        cursor.close()
        db_conn.close()

        return jsonify({'no_data_found': count})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500
    
# No Data Found Table API

@app.route('/no_data_found_table')
def get_no_data_found_table():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute("SELECT url, exceptions, run_id FROM rb.db_rb_exceptions WHERE (CONVERT(varchar(max), exceptions) = 'No data found for the given URL'OR CONVERT(varchar(max), exceptions) = 'No units found')  AND run_id = (SELECT MAX(run_id) FROM rb.db_rb_exceptions);")

        rows = cursor.fetchall()
    
        columns = [desc[0] for desc in cursor.description]
        no_data_found_table = []
        for row in rows:
            converted_row = []
            for item in row:
                if isinstance(item, date):
                    item = item.isoformat()
                converted_row.append(item)
            no_data_found_table.append(dict(zip(columns, converted_row)))
        
        cursor.close()
        db_conn.close()

        return jsonify({'data': no_data_found_table})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500
    
# No Property Data Found Count

@app.route('/no_property_data_found', methods=['GET'])
def get_no_property_data_found():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute("SELECT COUNT(*) AS count FROM rb.db_rb_exceptions WHERE exceptions LIKE '%Link with text%' AND run_id = (SELECT MAX(run_id) FROM rb.db_rb_exceptions);")
        count = cursor.fetchone()[0]
        
        cursor.close()
        db_conn.close()

        return jsonify({'no_property_data_found': count})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500
    
# No property data found table

@app.route('/no_property_data_found_table')
def get_no_property_data_found_table():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute("SELECT url,exceptions,run_id FROM rb.db_rb_exceptions WHERE exceptions LIKE '%Link with text%'and run_id=(SELECT MAX(run_id) FROM rb.db_rb_exceptions)")

        rows = cursor.fetchall()
    
        columns = [desc[0] for desc in cursor.description]
        no_property_data_found_table = []
        for row in rows:
            converted_row = []
            for item in row:
                if isinstance(item, date):
                    item = item.isoformat()
                converted_row.append(item)
            no_property_data_found_table.append(dict(zip(columns, converted_row)))
        
        cursor.close()
        db_conn.close()

        return jsonify({'data': no_property_data_found_table})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500

# New URL Onboarded API (rb.db_rb_url_catalog)

@app.route('/new_url_onboarded', methods=['GET'])
def get_new_url_onboarded():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute('SELECT COUNT(*) AS COUNT FROM rb.db_rb_url_catalog')
        count = cursor.fetchone()[0]
        
        cursor.close()
        db_conn.close()

        return jsonify({'new_url_onboarded': count})

    except pyodbc.Error as e:
       return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500
    
# New URL Onboarded Table API (rb.db_rb_url_catalog)
    
@app.route('/new_url_onboarded_table')
def get_new_url_onboarded_table():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute('select * from rb.db_rb_url_catalog')
        rows = cursor.fetchall()
    
        columns = [desc[0] for desc in cursor.description]
        new_url_onboarded_table = []
        for row in rows:
            converted_row = []
            for item in row:
                if isinstance(item, date):
                    item = item.isoformat()
                converted_row.append(item)
            new_url_onboarded_table.append(dict(zip(columns, converted_row)))
        
        cursor.close()
        db_conn.close()

        return jsonify({'data': new_url_onboarded_table})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500

# URLs In Development API (rb.db_rb_url_catalog)

@app.route('/urls_in_development', methods=['GET'])
def get_urls_in_development():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute('SELECT COUNT(*) AS COUNT FROM rb.db_rb_url_catalog')
        count = cursor.fetchone()[0]
        
        cursor.close()
        db_conn.close()

        return jsonify({'urls_in_development': count})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500

# URLs In Development Table API (rb.db_rb_url_catalog)
    
@app.route('/urls_in_development_table')
def get_urls_in_development_table():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute('select * from rb.db_rb_url_catalog')
        rows = cursor.fetchall()
    
        columns = [desc[0] for desc in cursor.description]
        urls_in_development_table = []
        for row in rows:
            converted_row = []
            for item in row:
                if isinstance(item, date):
                    item = item.isoformat()
                converted_row.append(item)
            urls_in_development_table.append(dict(zip(columns, converted_row)))
        
        cursor.close()
        db_conn.close()

        return jsonify({'data': urls_in_development_table})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500

# Total Unique Data Points API (rb.db_rb_url_catalog, rb.db_rb_property_data)

@app.route('/total_unique_data_points', methods=['GET'])
def get_total_unique_data_points():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute("SELECT COUNT(*) AS count FROM (SELECT t1.url, t1.url_id, COUNT(t2.url_id) AS url_count FROM rb.db_rb_url_catalog t1 JOIN rb.db_rb_property_data t2 ON t1.url_id = t2.url_id WHERE t2.run_id = (SELECT MAX(run_id) FROM rb.db_rb_property_data) GROUP BY t1.url, t1.url_id) as subquery")
        count = cursor.fetchone()[0]
        
        cursor.close()
        db_conn.close()

        return jsonify({'total_unique_data_points': count})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500

# Total Unique Data Points Table API (rb.db_rb_url_catalog, rb.db_rb_property_data)
    
@app.route('/total_unique_data_points_table')
def get_total_unique_data_points_table():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute("SELECT t1.url, t1.url_id, COUNT(t2.url_id) AS url_count FROM rb.db_rb_url_catalog t1 JOIN rb.db_rb_property_data t2 ON t1.url_id = t2.url_id WHERE t2.run_id = (SELECT MAX(run_id) FROM rb.db_rb_property_data) GROUP BY t1.url, t1.url_id;")
        rows = cursor.fetchall()
    
        columns = [desc[0] for desc in cursor.description]
        total_unique_data_points_table = []
        for row in rows:
            converted_row = []
            for item in row:
                if isinstance(item, date):
                    item = item.isoformat()
                converted_row.append(item)
            total_unique_data_points_table.append(dict(zip(columns, converted_row)))
        
        cursor.close()
        db_conn.close()

        return jsonify({'data': total_unique_data_points_table})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500

# URL with Exception API (rb.db_rb_url_catalog, rb.db_rb_exceptions)

@app.route('/url_with_exception', methods=['GET'])
def get_url_with_exception():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute("SELECT COUNT(*) AS row_count FROM ( SELECT t1.url_id,COUNT(*) AS exceptions_count,STRING_AGG(CONVERT(nvarchar(max), t2.exceptions), ', ') AS exceptions FROM rb.db_rb_url_catalog t1 JOIN rb.db_rb_exceptions t2 ON t1.url_id = t2.url_id WHERE t2.exceptions IS NOT NULL AND DATALENGTH(t2.exceptions) > 0 GROUP BY t1.url_id ) AS subquery;")
        count = cursor.fetchone()[0]
        
        cursor.close()
        db_conn.close()

        return jsonify({'url_with_exception': count})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500

# URL with Exception Table API (rb.db_rb_url_catalog, rb.db_rb_exceptions)
     
@app.route('/url_with_exception_table')
def get_url_with_exception_table():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute("SELECT t1.url,t1.url_id, COUNT(*) AS exceptions_count, STRING_AGG(CONVERT(nvarchar(max), t2.exceptions), ', ') AS exceptions FROM rb.db_rb_url_catalog t1 JOIN rb.db_rb_exceptions t2 ON t1.url_id = t2.url_id WHERE t2.exceptions IS NOT NULL AND DATALENGTH(t2.exceptions) > 0 GROUP BY t1.url_id,t1.url;")
        rows = cursor.fetchall()
    
        columns = [desc[0] for desc in cursor.description]
        url_with_exception_table = []
        for row in rows:
            converted_row = []
            for item in row:
                if isinstance(item, date):
                    item = item.isoformat()
                converted_row.append(item)
            url_with_exception_table.append(dict(zip(columns, converted_row)))
        
        cursor.close()
        db_conn.close()

        return jsonify({'data': url_with_exception_table})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500

# Total Properties Analyzed API (rb.db_rb_property_data)

@app.route('/total_properties_analyzed', methods=['GET'])
def get_total_properties_analyzed():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute('SELECT COUNT(*) AS COUNT FROM rb.db_rb_property_data where run_id = (select max(run_id) from rb.db_rb_property_data)')
        count = cursor.fetchone()[0]
        
        cursor.close()
        db_conn.close()

        return jsonify({'total_properties_analyzed': count})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500

# Total Properties Analyzed Table API (rb.db_rb_url_catalog, rb.db_rb_property_data)
     
@app.route('/total_properties_analyzed_table')
def get_total_properties_analyzed_table():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute("SELECT t1.url AS url, t2.* FROM rb.db_rb_url_catalog t1 JOIN rb.db_rb_property_data t2 ON t1.url_id = t2.url_id WHERE t2.run_id = (SELECT MAX(run_id) FROM rb.db_rb_property_data)")
        rows = cursor.fetchall()
    
        columns = [desc[0] for desc in cursor.description]
        total_properties_analyzed_table = []
        for row in rows:
            converted_row = []
            for item in row:
                if isinstance(item, date):
                    item = item.isoformat()
                converted_row.append(item)
            total_properties_analyzed_table.append(dict(zip(columns, converted_row)))
        
        cursor.close()
        db_conn.close()

        return jsonify({'data': total_properties_analyzed_table})

    except pyodbc.Error as e:
       return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500

# Property Data Exception API (rb.db_rb_property_data_exceptions)

@app.route('/property_data_exceptions', methods=['GET'])
def get_property_data_exceptions():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute('SELECT COUNT(*) AS COUNT FROM rb.db_rb_property_data_exceptions')
        count = cursor.fetchone()[0]
        
        cursor.close()
        db_conn.close()

        return jsonify({'property_data_exceptions': count})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500
# Property Data Exceptions Table API (rb.db_rb_property_data_exceptions)
    
@app.route('/property_data_exceptions_table')
def get_property_data_exceptions_table():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute('select * from rb.db_rb_property_data_exceptions')
        rows = cursor.fetchall()
    
        columns = [desc[0] for desc in cursor.description]
        property_data_exceptions_table = []
        for row in rows:
            converted_row = []
            for item in row:
                if isinstance(item, date):
                    item = item.isoformat()
                converted_row.append(item)
            property_data_exceptions_table.append(dict(zip(columns, converted_row)))
        
        cursor.close()
        db_conn.close()

        return jsonify({'data': property_data_exceptions_table})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500

# Invalid Property Data API (rb.db_rb_property_data_exceptions)

@app.route('/invalid_property_data', methods=['GET'])
def get_invalid_property_data():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute('SELECT COUNT(*) AS COUNT FROM rb.db_rb_property_data_exceptions')
        count = cursor.fetchone()[0]
        
        cursor.close()
        db_conn.close()

        return jsonify({'invalid_property_data': count})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500

# Invalid Property Data Table API (rb.db_rb_property_data_exceptions)
  
@app.route('/invalid_property_data_table')
def get_invalid_property_data_table():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute('select * from rb.db_rb_property_data_exceptions')
        rows = cursor.fetchall()
    
        columns = [desc[0] for desc in cursor.description]
        invalid_property_data_table = []
        for row in rows:
            converted_row = []
            for item in row:
                if isinstance(item, date):
                    item = item.isoformat()
                converted_row.append(item)
            invalid_property_data_table.append(dict(zip(columns, converted_row)))
        
        cursor.close()
        db_conn.close()

        return jsonify({'data': invalid_property_data_table})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500

# Missing Unit Details API (rb.db_rb_property_data_exceptions)

@app.route('/missing_unit_details', methods=['GET'])
def get_missing_unit_details():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute('SELECT COUNT(*) AS COUNT FROM rb.db_rb_property_data_exceptions')
        count = cursor.fetchone()[0]
        
        cursor.close()
        db_conn.close()

        return jsonify({'missing_unit_details': count})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500

# Missing Unit Details Table API (rb.db_rb_property_data_exceptions)
  
@app.route('/missing_unit_details_table')
def get_missing_unit_details_table():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute('select * from rb.db_rb_property_data_exceptions')
        rows = cursor.fetchall()
    
        columns = [desc[0] for desc in cursor.description]
        missing_unit_details_table = []
        for row in rows:
            converted_row = []
            for item in row:
                if isinstance(item, date):
                    item = item.isoformat()
                converted_row.append(item)
            missing_unit_details_table.append(dict(zip(columns, converted_row)))
        
        cursor.close()
        db_conn.close()

        return jsonify({'data': missing_unit_details_table})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500
    
# Latest Processing Time 

@app.route('/latest_processing_time', methods=['GET'])
def get_latest_processing_time():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute("SELECT CONCAT(RIGHT('00' + CAST(FLOOR(DATEDIFF(minute, MIN(url_start_time), MAX(url_start_time)) / 60) AS VARCHAR(2)), 2), ' h : ', RIGHT('00' + CAST(DATEDIFF(minute, MIN(url_start_time), MAX(url_start_time)) % 60 AS VARCHAR(2)), 2), ' m') AS time_difference FROM rb.db_rb_url_process_history WHERE run_id = (SELECT MAX(run_id) FROM rb.db_rb_url_process_history)")
        result = cursor.fetchone()
        time_difference = result[0]

        
        cursor.close()
        db_conn.close()

        return jsonify({'latest_processing_time': time_difference})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500

# Pipeline Status API (rb.db_rb_pipeline_status)

@app.route('/pipeline_status', methods=['GET'])
def get_pipeline_status():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute('SELECT COUNT(*) AS COUNT FROM rb.db_rb_pipeline_status')
        count = cursor.fetchone()[0]
        
        cursor.close()
        db_conn.close()

        return jsonify({'pipeline_status': count})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500

# Pipeline Status Table API (rb.db_rb_pipeline_status)
    
@app.route('/pipeline_status_table')
def get_pipeline_status_table():
    db_conn, db_cursor = connect_to_database()
    if db_conn is None or db_cursor is None:
        return jsonify({'error': 'Failed to connect to the database.'}), 500
    
    try:
        cursor = db_cursor

        cursor.execute('select * from rb.db_rb_pipeline_status')
        rows = cursor.fetchall()
    
        columns = [desc[0] for desc in cursor.description]
        pipeline_status_table = []
        for row in rows:
            converted_row = []
            for item in row:
                if isinstance(item, date):
                    item = item.isoformat()
                converted_row.append(item)
            pipeline_status_table.append(dict(zip(columns, converted_row)))
        
        cursor.close()
        db_conn.close()

        return jsonify({'data': pipeline_status_table})

    except pyodbc.Error as e:
        return jsonify({'error': 'An error occurred. Please try again later.' + str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
