<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use App\Helpers\apiFormatter;

class MahasiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Mahasiswa::all();

        // return $data;

        if($data){
            return apiFormatter::createApi(200,'success',$data);
        } else {
            return apiFormatter::createApi(400,'failed');
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $request->validate([
                'Nama' => 'required',
                'NIM' => 'required|max:7',
            ]);

            $data = Mahasiswa::create([
                'Nama' => $request->Nama,
                'NIM' => $request->NIM
            ]);

            return apiFormatter::createApi(201,'Success Create', $data);

        } catch (Exception $error) {
            return apiFormatter::createApi(400,'failed');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Mahasiswa  $mahasiswa
     * @return \Illuminate\Http\Response
     */
    public function show(Mahasiswa $mahasiswa)
    {
        $data = Mahasiswa::findOrFail($mahasiswa->id);

        return apiFormatter::createApi(200,'success',$data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Mahasiswa  $mahasiswa
     * @return \Illuminate\Http\Response
     */
    public function edit(Mahasiswa $mahasiswa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Mahasiswa  $mahasiswa
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Mahasiswa $mahasiswa)
    {
        try {
            $request->validate([
                'Nama' => 'required',
                'NIM' => 'required',
            ]);


            $data = Mahasiswa::where('id',$mahasiswa->id);

            $data->update([
                'Nama' => $request->Nama,
                'NIM' => $request->NIM
            ]);



            if ($data) {
                return ApiFormatter::createApi(200, 'Success Update Data', $data->get());
            } else {
                return ApiFormatter::createApi(400, 'Failed');
            }
        } catch (Exception $error) {
            return ApiFormatter::createApi($error->status, 'Failed');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Mahasiswa  $mahasiswa
     * @return \Illuminate\Http\Response
     */
    public function destroy(Mahasiswa $mahasiswa)
    {
        $data = Mahasiswa::where('id',$mahasiswa->id);
        $data->delete();

        return apiFormatter::createApi(201,'Delete Success',$data);
    }
}
