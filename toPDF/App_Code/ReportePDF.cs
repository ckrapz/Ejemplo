using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de ReportePDF
/// </summary>
public class ReportePDF
{
    public string cadena = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
    SqlConnection SqlConn;

	public ReportePDF()
	{
		//
		// TODO: Agregar aquí la lógica del constructor
		//
	}

    public void pdfDatosGralProyecto(string cvProyecto)
    {
        string CadenaDireccion = AppDomain.CurrentDomain.BaseDirectory.ToString() + "\\ficha_" + cvProyecto + ".pdf";

        int columnas = 10;
        int Totalfilas = 50;

        formatopdf.IniciaTabla(columnas, Totalfilas + 9);
        formatopdf.ColocaBannerTabla();
        formatopdf.Fuente();
        formatopdf.FuenteNum(8);
        formatopdf.FuenteCOlor(46, 46, 46);

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        formatopdf.IngresaTextoBarraAbajoNegrita("DATOS DEL PROYECTO", 10);
        formatopdf.IngresaTexto(" ", 10);

        //formatopdf.IngresaTexto("\n\n.", 10);
        //formatopdf.IngresaTextoBarraArriba("asasas", 3);
        //formatopdf.IngresaTexto(".", 7);

        SqlConn = new SqlConnection(cadena);
        SqlConn.Open();
        
        SqlDataReader reader = null;

        SqlCommand sqlCmd = new SqlCommand("[dbo].[Marker_DatosDeUnProyecto]", SqlConn);
        sqlCmd.CommandType = CommandType.StoredProcedure;
        sqlCmd.Parameters.AddWithValue("@cvProyecto", cvProyecto);
        reader = sqlCmd.ExecuteReader();     

        while (reader.Read())
        {
            string CveProyecto = reader["CveProyecto"].ToString();
            string NomProyectoIntegral = reader["NomProyectoIntegral"].ToString();
            string NomProyecto = reader["NomProyecto"].ToString();
            string DescProyecto = reader["DescProyecto"].ToString();
            string RiesgosEjecucionProyecto = reader["RiesgosEjecucionProyecto"].ToString();
            string Subsector = reader["Subsector"].ToString();
            string Etapa = reader["Etapa"].ToString();
            string FaseProyecto = reader["FaseProyecto"].ToString();
            string TipoProyecto = reader["TipoProyecto"].ToString();
            string Medida = reader["Medida"].ToString();
            string RHA = reader["RHA"].ToString();
            string Estado = reader["Estado"].ToString();
            string UnidadPlaneacion = reader["UnidadPlaneacion"].ToString();
            string Municipio = reader["Municipio"].ToString();
            string Localidad = reader["Localidad"].ToString();
            string Ramo = reader["Ramo"].ToString();
            string ModalidadProgramaPresupuestario = reader["ModalidadProgramaPresupuestario"].ToString();
            string Finalidad = reader["Finalidad"].ToString();
            string Funcion = reader["Funcion"].ToString();

            formatopdf.IngresaTextoNegrita("Clave del proyecto:", 2);
            formatopdf.IngresaTexto(CveProyecto, 8);
            formatopdf.IngresaTextoNegrita("Proyecto integral:", 2);
            formatopdf.IngresaTexto(NomProyectoIntegral, 8);
            formatopdf.IngresaTextoNegrita("Nombre del proyecto:", 2);
            formatopdf.IngresaTexto(NomProyecto, 8);
            formatopdf.IngresaTextoNegrita("Descripción del proyecto:", 2);
            formatopdf.IngresaTexto(DescProyecto, 8);
            formatopdf.IngresaTextoNegrita("Riesgo en la ejecución del proyecto:", 2);
            formatopdf.IngresaTexto(RiesgosEjecucionProyecto, 8);
            
            formatopdf.IngresaTextoNegrita("Subsector:", 1);
            formatopdf.IngresaTexto(Subsector, 2);

            formatopdf.IngresaTextoNegrita("Fase:", 1);
            formatopdf.IngresaTexto(FaseProyecto, 2);

            formatopdf.IngresaTextoNegrita("Medida (acción):", 1);
            formatopdf.IngresaTexto(Medida, 3);

            formatopdf.IngresaTextoNegrita("Etapa:", 1);
            formatopdf.IngresaTexto(Etapa, 2);

            formatopdf.IngresaTextoNegrita("Tipo:", 1);
            formatopdf.IngresaTexto(TipoProyecto, 6);

            ////////////////////////////////////////////////////////////////////////////////////////////////////
            formatopdf.IngresaTexto(" ", 10);
            formatopdf.IngresaTextoBarraAbajoNegrita("UBICACIÓN DEL PROYECTO", 10);
            formatopdf.IngresaTexto(" ", 10);
            
            formatopdf.IngresaTextoNegrita("RHA:", 1);
            formatopdf.IngresaTexto(RHA, 2);

            formatopdf.IngresaTextoNegrita("Estado:", 1);
            formatopdf.IngresaTexto(Estado, 2);

            formatopdf.IngresaTextoNegrita("Unidad de planeación (UP):", 2);
            formatopdf.IngresaTexto(UnidadPlaneacion, 2);

            formatopdf.IngresaTextoNegrita("Municipio:", 1);
            formatopdf.IngresaTexto(Municipio, 2);

            formatopdf.IngresaTextoNegrita("Localidad:", 1);
            formatopdf.IngresaTexto(Localidad, 6);

            formatopdf.IngresaTextoBarraAbajoNegrita("ESTRUCTURA PROGRAMÁTICA", 10);

            formatopdf.IngresaTextoNegrita("Ramo (RA):", 2);
            formatopdf.IngresaTexto(Ramo, 2);

            formatopdf.IngresaTextoNegrita("Modalidad/Programa Presupuestario (PP):", 3);
            formatopdf.IngresaTexto(ModalidadProgramaPresupuestario, 3);

            formatopdf.IngresaTextoNegrita("Finalidad (FI):", 2);
            formatopdf.IngresaTexto(Finalidad, 2);

            formatopdf.IngresaTextoNegrita("Función (FU):", 3);
            formatopdf.IngresaTexto(Funcion, 3);

            
        }
        SqlConn.Close();
                
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        formatopdf.IngresaTexto(" ", 10);
        formatopdf.IngresaTextoBarraAbajoNegrita("FINANCIAMIENTO E INVERSIONES", 10);

        SqlConn = new SqlConnection(cadena);
        SqlConn.Open();

        reader = null;
        sqlCmd = new SqlCommand("[dbo].[Marker_FinanciamientoeInversiones]", SqlConn);
        sqlCmd.CommandType = CommandType.StoredProcedure;
        sqlCmd.Parameters.AddWithValue("@cvProyecto", cvProyecto);
        reader = sqlCmd.ExecuteReader();

        formatopdf.IngresaTextoFondonNegrita("Descripcion", 5, 240, 240, 240);
        formatopdf.IngresaTextoFondonNegrita("Cantidad $", 5, 240, 240, 240);
        
        while (reader.Read())
        {
            string Descripcion = reader["Descripcion"].ToString();
            string Importe = reader["Importe"].ToString();

            formatopdf.IngresaFondoAzul(Descripcion, 5, 243, 245, 246);
            formatopdf.IngresaFondoAzul(Importe, 5, 243, 245, 246);


        }
        SqlConn.Close();

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        formatopdf.IngresaTexto(" ", 10);
        formatopdf.IngresaTextoBarraAbajoNegrita("META PROGRAMADA", 10);
        formatopdf.IngresaTexto(" ", 10);

        SqlConn = new SqlConnection(cadena);
        SqlConn.Open();

        reader = null;
        sqlCmd = new SqlCommand("[dbo].[Marker_DatosPriorizacion]", SqlConn);
        sqlCmd.CommandType = CommandType.StoredProcedure;
        sqlCmd.Parameters.AddWithValue("@cvProyecto", cvProyecto);
        reader = sqlCmd.ExecuteReader();

        while (reader.Read())
        {
            string Meta = reader["Meta"].ToString();
            string Beneficios = reader["Beneficios"].ToString();
            string CI = reader["CI"].ToString();
            string CAU = reader["CAU"].ToString();
            string CONA = reader["CONA"].ToString();
            string CA = reader["CA"].ToString();
            string REP = reader["REP"].ToString();
            string SubNecesidad = reader["SubNecesidad"].ToString();
            string Solucion = reader["Solucion"].ToString();
            string Descripcion = reader["Descripcion"].ToString();
            string RFNVB = reader["RFNVB"].ToString();
            string DVB = reader["DVB"].ToString();
            string MBFE = reader["MBFE"].ToString();
            string ARVB = reader["ARVB"].ToString();
            string Fuente = reader["Fuente"].ToString();

            formatopdf.IngresaTextoNegrita("Meta:", 1);
            formatopdf.IngresaTexto(Meta, 4);

            formatopdf.IngresaTextoNegrita("Beneficios:", 1);
            formatopdf.IngresaTexto(Beneficios, 4);

            formatopdf.IngresaTexto("\n\n", 10);
            formatopdf.IngresaTexto(" ", 10);
            formatopdf.IngresaTexto(" ", 10);
            formatopdf.IngresaTexto(" ", 10);
            formatopdf.IngresaTexto(" ", 10);
            formatopdf.IngresaTexto(" ", 10);
            formatopdf.IngresaTextoBarraAbajoNegrita("DATOS PARA LA PRIORIZACIÓN", 10);
            formatopdf.IngresaTexto(" ", 10);

            formatopdf.IngresaTextoNegrita("Categoría de impacto:", 2);
            formatopdf.IngresaTexto(CI, 3);

            formatopdf.IngresaTextoNegrita("Requerimiento para que se ejecute el proyecto:", 2);
            formatopdf.IngresaTexto(REP, 3);

            formatopdf.IngresaTextoNegrita("Recursos financieros necesarios para vencer barrera ($):", 2);
            formatopdf.IngresaTexto(RFNVB, 3);

            formatopdf.IngresaTextoNegrita("Costo adicional por uso $:", 2);
            formatopdf.IngresaTexto(CAU, 3);

            formatopdf.IngresaTextoNegrita("Subtema de necesidad:", 2);
            formatopdf.IngresaTexto(SubNecesidad, 3);

            formatopdf.IngresaTextoNegrita("Dificultad para vencer barrera:", 2);
            formatopdf.IngresaTexto(DVB, 3);


            formatopdf.IngresaTextoNegrita("Costo operativo neto anual ($) (ahorros):", 2);
            formatopdf.IngresaTexto(CI, 3);

            formatopdf.IngresaTextoNegrita("¿Existe solución?", 2);
            formatopdf.IngresaTexto(Solucion, 3);

            formatopdf.IngresaTextoNegrita("Momento en que barrera frena ejecución:", 2);
            formatopdf.IngresaTexto(MBFE, 3);

            formatopdf.IngresaTextoNegrita("Costo del agua ($/m³):", 2);
            formatopdf.IngresaTexto(CA, 3);

            formatopdf.IngresaTextoNegrita("Área responsable en vencer barrera:", 2);
            formatopdf.IngresaTexto(ARVB, 8);

            formatopdf.IngresaTextoNegrita("Descripción:", 2);
            formatopdf.IngresaTexto(Descripcion, 8);
        }
        SqlConn.Close();
     



        formatopdf.CierradocHorizontal("ficha_" + cvProyecto + ".pdf", "usuario", CadenaDireccion);
    }

}