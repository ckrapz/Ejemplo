using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Data.SqlClient;


/// <summary>
/// Descripción breve de conectorSql
/// </summary>
public class conectorSql
{
	public conectorSql()
	{
        //
		// TODO: Agregar aquí la lógica del constructor
		//
	}

    public  SqlConnection con;
    public SqlCommand comm;
    public void Abrirconexion()
    {
        con = new SqlConnection();

        con.ConnectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        con.Open();
    }

    public void CierraConexion()
    {
        con.Close();    
    }
    
    //--- prueba para saber si esta abierta la conexion
    public bool PruebaConexion()
    { 
        try
        {
            Abrirconexion();
            CierraConexion();
            return true;
        }
        catch (Exception ex)
        {
            //WebMsgBox.Show(ex.Message);
           CierraConexion();
           return false;
        }
    }

    public DataTable Lectura(String cadena)
    {
        DataTable dt = new DataTable();
        SqlDataAdapter da;

        try
        {
            Abrirconexion();
            da = new SqlDataAdapter(cadena, con);
            da.Fill(dt);
            da.Dispose();
            CierraConexion();
        }
        catch (Exception ex)
        {
            //WebMsgBox.Show(ex.Message);
            CierraConexion();
            return null;
        }
        return dt;
    }

    public DataTable Lectura2(String cadena)
    {
        DataTable dt = new DataTable();
        SqlDataAdapter da;

        try
        {
            Abrirconexion();
            da = new SqlDataAdapter(cadena, con);
            da.Fill(dt);
            da.Dispose();
            CierraConexion();
        }
        catch (Exception ex)
        {
            
            CierraConexion();
            return null;
        }
        return dt;
    }

    public SqlDataReader RecordInfo(String cadena)
    {
        SqlDataReader lea;
        try
        {
            Abrirconexion();
            comm = new SqlCommand(cadena, con);
            lea = comm.ExecuteReader();
        }
        catch (Exception ex)
        {
            //WebMsgBox.Show(ex.Message);
            CierraConexion();
            return null;
        }
        return lea;
    }

    public bool Excute(String Ejecuta)
    {
        try
        {
            Abrirconexion();
            comm = new SqlCommand(Ejecuta, con);
            comm.ExecuteNonQuery();
            CierraConexion();
            return true;
        }
        catch (Exception e)
        {
            //WebMsgBox.Show(e.Message);
            CierraConexion();
            return false;
        }    
    }

    public bool ExisteRegistro(String Query)
    {
        SqlDataReader leer;
        int cuantos=0;
        try
        {
            Abrirconexion();
            comm = new SqlCommand(Query, con);
            leer = comm.ExecuteReader();
            while (leer.Read())
            {
                cuantos++;
            }
            if (cuantos == 0)
            {
                leer.Close();
                CierraConexion();
                return false;
            }
            else
            {
                leer.Close();
                CierraConexion();
                return true;
            }
        }
        catch (Exception ex)
        {
            //WebMsgBox.Show(ex.Message);
            CierraConexion();
            return false;
        }
    }

}
